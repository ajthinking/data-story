import { Signal, Source } from './signal';
import { describe } from 'vitest';
import { take } from 'rxjs/operators';
import { TestScheduler } from 'rxjs/testing';
import { NodePorts } from './sleep';

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
      const ports = Signal.boot({ period: 10, count: 3, expression });
      const output$ = ports.getOutput().getPort('output');

      expectObservable(output$.pipe(take(3))).toBe('10ms a 9ms b 9ms (c|)', {
        a:{identifier: 0},
        b:{identifier: 10},
        c: {identifier: 20}
      });
    });
  });

  it('should return EMPTY when requested port is not "output"', () => {
    const ports = Signal.boot({ period: 10, count: 3, expression: (i: number) => i * 10 });
    const output$ = ports.getOutput().getPort('notOutput');

    testScheduler.run(({ expectObservable }) => {
      expectObservable(output$).toBe('|', {});
    });
  });

  it('should return the correct SourceNode instance', () => {
    const sourceNode = Signal.boot({ period: 10, count: 3, expression:(i: number) => i * 10 });

    expect(sourceNode).toBeInstanceOf(Source);
  });

  it('should return the correct NodePorts instance', () => {
    const sourceNode = Signal.boot({ period: 10, count: 3, expression:(i: number) => i * 10 });

    expect(sourceNode.getOutput()).toBeInstanceOf(NodePorts);
  });

  it('should have the correct nodeType', () => {
    const sourceNode = Signal.boot({ period: 10, count: 3, expression: (i: number) => i * 10 });

    expect(sourceNode.nodeType).toBe('source');
  });
});
