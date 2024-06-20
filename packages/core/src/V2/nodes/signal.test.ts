import { SignalNodePorts, SourceNode } from './signal';
import { describe } from 'vitest';
import { take } from 'rxjs/operators';
import { TestScheduler } from 'rxjs/testing';

describe('Signal', () => {
  let testScheduler: TestScheduler;

  beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  it('should emit values according to the expression when "output" port is requested', () => {
    testScheduler.run(({ expectObservable }) => {
      const expression = vi.fn().mockImplementation(i => ({identifier: i * 10}));
      const ports = new SignalNodePorts({ period: 10, count: 3, expression });
      const output$ = ports.getPort('output');

      expectObservable(output$.pipe(take(3))).toBe('10ms a 9ms b 9ms (c|)', {
        a:{identifier: 0},
        b:{identifier: 10},
        c: {identifier: 20}
      });
    });
  });

  it('should return EMPTY when requested port is not "output"', () => {
    const ports = new SignalNodePorts({ period: 10, count: 3, expression: i => i * 10 });
    const output$ = ports.getPort('notOutput');

    testScheduler.run(({ expectObservable }) => {
      expectObservable(output$).toBe('|', {});
    });
  });

  it('should return the correct NodePorts instance', () => {
    const mockNodePorts = new SignalNodePorts({ period: 10, count: 3, expression: i => i * 10 });
    const node = new SourceNode(mockNodePorts);

    expect(node.getOutput()).toBe(mockNodePorts);
  });

  it('should have the correct nodeType', () => {
    const mockNodePorts = new SignalNodePorts({ period: 10, count: 3, expression: i => i * 10 });
    const node = new SourceNode(mockNodePorts);

    expect(node.nodeType).toBe('source');
  });
});
