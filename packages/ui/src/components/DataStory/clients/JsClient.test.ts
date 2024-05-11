import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { JsClient } from './JsClient';
import { Application, Diagram, Executor, NodeDescription } from '@data-story/core';

vi.mock('@data-story/core', () => {
  const originalModule = vi.importActual('@data-story/core');

  const executor = vi.fn(() => ({
    execute: vi.fn(),
  }))

  return {
    ...originalModule,
    ExecutorFactory: {
      create: executor,
    },
    Executor: executor,
    Diagram: vi.fn(),
    InMemoryStorage: vi.fn(),
    InputObserverController: vi.fn(),
  };
});

describe('JsClient', () => {
  let setAvailableNodesMock: (nodes: NodeDescription[]) => void;
  let updateEdgeCountsMock: (edgeCounts: Record<string, number>) => void;
  let appMock: Application;
  let client: JsClient;
  let consoleLogSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    setAvailableNodesMock = vi.fn();
    updateEdgeCountsMock = vi.fn();
    appMock = {
      descriptions: vi.fn().mockReturnValue([]),
      computers: [],
      hooks: new Map(),
      // Add any other properties or methods expected by the Application type
    } as unknown as Application; // Cast to Application if necessary
    client = new JsClient({
      setAvailableNodes: setAvailableNodesMock,
      updateEdgeCounts: updateEdgeCountsMock,
      app: appMock
    });
    consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {}) as any;
  });

  afterEach(() => {
    consoleLogSpy.mockRestore();
  });

  it('should set available nodes and log connection on init', () => {
    client.init();
    expect(setAvailableNodesMock).toHaveBeenCalledWith([]);
    expect(console.log).toHaveBeenCalledWith('Connected to server: JS');
  });

  it('should execute diagram and handle updates on run', async() => {
    const diagramMock = new Diagram();

    // Mock the Executor class with the required arguments
    const executorMock = {
      execute: vi.fn(() => {
        let hasYielded = false; // Closure variable to track the state
        return {
          [Symbol.asyncIterator]: () => ({
            next: () => {
              if (!hasYielded) {
                hasYielded = true; // Update the state to indicate the value has been yielded
                return Promise.resolve({
                  value: { counts: { '1': 1 }, hooks: [{ type: 'CONSOLE_LOG', args: ['Log message'] }] },
                  done: false
                });
              } else {
                return Promise.resolve({ value: undefined, done: true });
              }
            }
          }),
        };
      }),
    };

    // Replace the Executor's constructor with a mock that returns the executorMock
    vi.mocked(Executor).mockImplementation(() => executorMock as unknown as Executor);

    await client.run(diagramMock);

    expect(executorMock.execute).toHaveBeenCalled();
    expect(updateEdgeCountsMock).toHaveBeenCalledWith({ '1': 1 });
    expect(console.log).toHaveBeenCalledWith('Log message');

    await client.run(diagramMock);
    expect(console.log).toHaveBeenCalledWith('Execution complete 💫');
  });

  it('should not throw when save is called', async() => {
    const diagram = new Diagram();

    await expect(client.save('test', diagram)).resolves.not.toThrow();
  });
});
