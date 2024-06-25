import { of } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';
import { Sleep } from './sleep';
import { LinkNodePorts } from './link';

describe('sleep', () => {
  let testScheduler: TestScheduler;

  beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  it('should delay the output by 20ms', () => {
    testScheduler.run(({ cold, expectObservable }) => {
      const inputValues = { a: 1 };
      const inputObservable = cold('a|', inputValues);
      const duration = 20;

      const inputPorts = new LinkNodePorts(inputObservable, 'input');
      const sleepNode = Sleep.boot(duration);
      const outputPorts = sleepNode.getOutput(inputPorts);
      const outputObservable = outputPorts.getPort('output');

      expectObservable(outputObservable).toBe('20ms (a|)', inputValues);
    });
  });

  it('should delay series of outputs by 20ms', () => {
    testScheduler.run(({ cold, expectObservable }) => {
      const inputValues = { a: 1, b: 2, c: 3 };
      const inputObservable = cold('a - b - c|', inputValues);
      const duration = 20;

      const inputPorts = new LinkNodePorts(inputObservable, 'input');
      const sleepNode = Sleep.boot(duration);
      const outputPorts = sleepNode.getOutput(inputPorts);
      const outputObservable = outputPorts.getPort('output');

      expectObservable(outputObservable).toBe('20ms a - b - (c|)', inputValues);
    });
  });

  it('should return EMPTY when requested port is not "output"', () => {
    const sleepNode = Sleep.boot(10);
    const outputPorts = sleepNode.getOutput(new LinkNodePorts(of({}), 'input'));
    const outputObservable = outputPorts.getPort('notOutput');

    testScheduler.run(({ expectObservable }) => {
      expectObservable(outputObservable).toBe('|', {});
    });
  });
});
