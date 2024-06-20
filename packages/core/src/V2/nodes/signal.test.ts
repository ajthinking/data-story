import { Signal } from './signal';
import { describe } from 'vitest';
import { map } from 'rxjs/operators';

describe('Signal', () => {
  it('outputs items incrementaly', async () => {
    Signal({
      period: {
        value: 1
      },
      count: {
        value: 3
      }
    }).getOutput()
      .getPort('output')
      .pipe(
        map((output, index) => {
          expect(output).toMatchObject([{ id: index + 1 }])
        })
      )
  })

  it('outputs items with the template provided', async () => {
    Signal({
      period: {
        value: 1
      },
      count: {
        value: 3
      },
      expression: {
        value: '{ identifier: ${i}}'
      }
    }).getOutput()
      .getPort('output')
      .pipe(
        map((output, index) => {
          expect(output).toMatchObject([{ identifier: index + 1 }])
        })
      );
  });
});
