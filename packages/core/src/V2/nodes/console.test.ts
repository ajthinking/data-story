import { beforeEach, describe } from 'vitest';
import { TestScheduler } from 'rxjs/testing';
import { LinkNodePorts } from './link';
import { of } from 'rxjs';

describe('Console', () => {
  let testScheduler: TestScheduler;
  beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });
  it('should watch values from input node', () => {
    testScheduler.run(({ cold, expectObservable }) => {
      const inputValues = { a: 1, b: 2, c: 3 };
      const inputObservable = cold('a - b - c|', inputValues);
      const inputPorts = new LinkNodePorts(inputObservable, 'input');
      const consoleNode = Console.boot();
      const outputPorts = consoleNode.getOutput(inputPorts);
      const outputObservable = outputPorts.getPort('output');
      expectObservable(outputObservable).toBe('a - b - c|', inputValues);
    });
  });
  it('should return EMPTY when requested port is not "output"', () => {
    const consoleNode = Console.boot();
    const outputPorts = consoleNode.getOutput(new LinkNodePorts(of({}), 'input'));
    const outputObservable = outputPorts.getPort('notOutput');
    testScheduler.run(({ expectObservable }) => {
      expectObservable(outputObservable).toBe('|', {});
    });
  });
})
