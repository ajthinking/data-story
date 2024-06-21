import { of } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';
import { NodePorts, Sleep } from './sleep';

describe('Sleep OperatorNode', () => {
  let testScheduler: TestScheduler;

  beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  it('should delay the output by 20ms', () => {
    testScheduler.run(({ cold, expectObservable }) => {
      const inputValues = { a: 1 };
      const inputObservable = cold('-a|', inputValues);
      const duration = 20;

      const inputPorts = new NodePorts(inputObservable);
      const sleepNode = Sleep.boot(duration);
      const outputPorts = sleepNode.getOutput(inputPorts);
      const outputObservable = outputPorts.getPort('output');

      // expectObservable(outputObservable).toBe('---(a|)', inputValues);
      expectObservable(outputObservable).toBe('---------------------a|', inputValues);
      // expectObservable(outputObservable).toBe('20ms (a|)', inputValues);
    });
  });

  it('should delay the output by 0ms', () => {
    testScheduler.run(({ cold, expectObservable }) => {
      const inputValues = { a: 1 };
      const inputObservable = cold('-a|', inputValues);
      const duration = 0;

      const inputPorts = new NodePorts(inputObservable);
      const sleepNode = Sleep.boot(duration);
      const outputPorts = sleepNode.getOutput(inputPorts);
      const outputObservable = outputPorts.getPort('output');

      expectObservable(outputObservable).toBe('-a|', inputValues);
    });
  });
});
