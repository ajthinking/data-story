import { ItemWithParams } from '../ItemWithParams';
import { createDefaultStringable, str } from '../Param';
import { numberCast } from '../Param/casts/numberCast';
import { stringCast } from '../Param/casts/stringCast';
import { ComputerConfig } from '../types/ComputerConfig';

export const Test: ComputerConfig = {
  name: 'Test',
  label: 'Test',
  inputs: ['input'],
  outputs: ['passed', 'failed'],
  params: [
    {
      name: 'tests',
      label: 'Tests',
      help: 'The tests to run (all must pass)',
      type: 'RepeatableParam',
      row: [
        createDefaultStringable({
          name: 'operand1',
          label: 'Operand 1',
          help: 'The first operand',
          value: 'v1',
          canInterpolate: true,
          interpolate: true,
          casts: [
            stringCast,
            numberCast,
          ],
          multiline: false,
        }),
        str({
          name: 'operator',
          value: '==',
        }),
        createDefaultStringable({
          name: 'operand2',
          label: 'Operand 2',
          help: 'The first operand',
          value: 'v2',
          canInterpolate: true,
          interpolate: true,
          casts: [
            stringCast,
            numberCast,
          ],
          multiline: false,
        }),
      ],
      value: [],
    }
  ],

  async *run({ input, output, params }) {
    const evaluateItem = (item: ItemWithParams): boolean => {
      console.log('Evaluating Item...')

      const tests = item.params.tests as {
        operand1: string,
        operator: string,
        operand2: string,
      }[]

      return tests.every(test => {
        if(test.operator === '==') {
          console.log('Evaluating', test.operand1, test.operator, test.operand2, test.operand1 == test.operand2)
          return test.operand1 == test.operand2
        }

        if(test.operator === '===') {
          console.log('Evaluating', test.operand1, test.operator, test.operand2, test.operand1 === test.operand2)
          return test.operand1 === test.operand2
        }

        if(test.operator === '!=') {
          console.log('Evaluating', test.operand1, test.operator, test.operand2, test.operand1 != test.operand2)
          return test.operand1 != test.operand2
        }

        if(test.operator === '!==') {
          console.log('Evaluating', test.operand1, test.operator, test.operand2, test.operand1 !== test.operand2)
          return test.operand1 !== test.operand2
        }

        if(test.operator === '>') {
          console.log('Evaluating', test.operand1, test.operator, test.operand2, test.operand1 > test.operand2)
          return test.operand1 > test.operand2
        }

        if(test.operator === '>=') {
          console.log('Evaluating', test.operand1, test.operator, test.operand2, test.operand1 >= test.operand2)
          return test.operand1 >= test.operand2
        }

        if(test.operator === '<') {
          console.log('Evaluating', test.operand1, test.operator, test.operand2, test.operand1 < test.operand2)
          return test.operand1 < test.operand2
        }

        if(test.operator === '<=') {
          console.log('Evaluating', test.operand1, test.operator, test.operand2, test.operand1 <= test.operand2)
          return test.operand1 <= test.operand2
        }

        throw new Error(`Operator "${test.operator}" not supported`)
      });
    };

    const segmentByEvaluation = (items: ItemWithParams[]) => {
      const failed: ItemWithParams[] = [];
      const passed: ItemWithParams[] = [];

      for(const item of items) {
        const isTruthy = evaluateItem(item)
        if(isTruthy) {
          passed.push(item)
        } else {
          failed.push(item)
        }
      }

      return [ failed, passed ];
    };

    while(true) {
      const items = input.pull()
      const [ failed, passed ] = segmentByEvaluation(items)

      output.pushTo('failed', failed)
      output.pushTo('passed', passed)

      yield;
    }
  },
};
