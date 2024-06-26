import { describe } from 'vitest';
import { LinkElementPorts } from './link';
import { TestScheduler } from 'rxjs/testing';
import { linkCount } from './linkCount';
import { of } from 'rxjs';

describe('linkCount', () => {
  let testScheduler: TestScheduler;

  beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });
  it('should count the number of 1 the link', () => {
    testScheduler.run(({ cold, expectObservable }) => {
      const inputValues = { a: 1 };
      const inputObservable = cold('a|', inputValues);
      const inputPorts = new LinkElementPorts(inputObservable, 'pipe');

      const ports = linkCount.boot({
        getLinkCount: (count: number) => {
          expect(count).toBe(1);
        }
      });
      const output$ = ports.getOutput(inputPorts).getPort('pipe');
      expectObservable(output$).toBe('a|', inputValues);
    })
  });

  it('should count the number of 3 the link', () => {
    testScheduler.run(({ cold, expectObservable }) => {
      const inputValues = { a: 1, b: 2, c: 3 };
      const inputObservable = cold('a - b - c|', inputValues);
      const inputPorts = new LinkElementPorts(inputObservable, 'pipe');

      let count = 1;
      const ports = linkCount.boot({
        getLinkCount: (count: number) => {
          expect(count).toBe(count++);
        }
      });

      const output$ = ports.getOutput(inputPorts).getPort('pipe');
      expectObservable(output$).toBe('a - b - c|', inputValues);
    })
  });

  it('should return EMPTY when requested port is not "output"', () => {
    const ports = linkCount.boot({
      getLinkCount: (count: number) => {
        expect(count).toBe(0);
      }
    });
    const outputPorts = ports.getOutput(new LinkElementPorts(of({}), 'pipe'));
    const outputObservable = outputPorts.getPort('notOutput');

    testScheduler.run(({ expectObservable }) => {
      expectObservable(outputObservable).toBe('|', {});
    });
  });
})
