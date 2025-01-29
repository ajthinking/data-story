import { ItemWithParams } from '../ItemWithParams';
import { createDefaultStringable, str } from '../Param';
import { numberCast } from '../Param/casts/numberCast';
import { stringCast } from '../Param/casts/stringCast';
import { Computer } from '../types/Computer';

type OperationFunction = (a: string, b: string) => boolean;

const sharedOperators = [
  { value: '==', label: '==' },
  { value: '===', label: '===' },
  { value: '!=', label: '!=' },
  { value: '!==', label: '!==' },
  { value: '>', label: '>' },
  { value: '>=', label: '>=' },
  { value: '<', label: '<' },
  { value: '<=', label: '<=' },
];

export const Test: Computer = {
  name: 'Test',
  label: 'Test',
  inputs: [{
    name: 'input',
    schema: {},
  }],
  outputs: [
    {
      name: 'passed',
      schema: {},
    },
    {
      name: 'failed',
      schema: {},
    },
  ],
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
        {
          name: 'operator',
          label: 'operator',
          help: '',
          type: 'SelectParam',
          value: '==',
          options: sharedOperators,
        },
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
    },
  ],

  async *run({ input, output, params }) {
    const evaluateItem = (item: ItemWithParams): boolean => {
      console.log('Evaluating Item...')

      const tests = item.params.tests as {
        operand1: string,
        operator: string,
        operand2: string,
      }[]

      /**
       * @return {Record<string, (a: string, b: string) => boolean>}
       * e.g.: { '==': (a, b) => a == b }
       */
      const operators: Record<string, OperationFunction> = sharedOperators.reduce(
        (acc, { value }) => {
          acc[value] = new Function('a', 'b', `return a ${value} b`) as OperationFunction;
          return acc;
        },
        {} as Record<string, OperationFunction>,
      );

      return tests.every(test => {
        const operation = operators[test.operator];
        if (!operation) {
          throw new Error(`Operator "${test.operator}" not supported`);
        }
        const result = operation(test.operand1, test.operand2);
        console.log('Evaluating', test.operand1, test.operator, test.operand2, result);
        return result;
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
