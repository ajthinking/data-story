import { describe, it, expect, vi } from 'vitest';
import { JsClient } from './JsClient';
import { Application, coreNodeProvider, Diagram, sleep } from '@data-story/core';

describe('JsClient', () => {
  it('should set available nodes and log connection on init', () => {
    const setAvailableNodesMock = vi.fn();
    let consoleLogSpy = vi.spyOn(console, 'log')
      .mockImplementation(() => {}) as any;

    const client = new JsClient({
      setAvailableNodes: setAvailableNodesMock,
      updateEdgeCounts: vi.fn(),
      app: new Application(),
    })

    client.init();
    expect(setAvailableNodesMock).toHaveBeenCalledWith([]);
    expect(consoleLogSpy).toHaveBeenCalledWith('Connected to server: JS');
  });

  it('should execute diagram and handle updates on run', async() => {
    const setAvailableNodesMock = vi.fn();
    const updateEdgeCountsMock = vi.fn();
    let consoleLogSpy = vi.spyOn(console, 'log')
      .mockImplementation(() => {}) as any;

    const app = new Application();
    app.register(coreNodeProvider);
    app.boot();

    const client = new JsClient({
      setAvailableNodes: setAvailableNodesMock,
      updateEdgeCounts: updateEdgeCountsMock,
      app,
    });

    const diagram = app.getDiagramBuilderV3()
      .add('Create')
      .add('ConsoleLog')
      .connect()
      .get();

    client.run(diagram);
    await sleep(1) // Allow time for the executor to execute

    expect(updateEdgeCountsMock).toHaveBeenCalledWith(
      { 'Create.1--->ConsoleLog.1': 1},
    );

    expect(consoleLogSpy).toHaveBeenCalledWith('Execution complete 💫');
  });

  it('should not throw when save is called', async() => {
    const client = new JsClient({
      setAvailableNodes: vi.fn(),
      updateEdgeCounts: vi.fn(),
      app: new Application(),
    });

    const diagram = new Diagram();

    await expect(client.save('test', diagram)).resolves.not.toThrow();
  });
});
