import { jsExpression } from '../Param';
import { Computer } from '../types/Computer';

export const Create: Computer = {
  name: 'Create',
  label: 'Create',
  inputs: [],
  outputs: [
    {
      name: 'output',
      schema: {},
    },
  ],
  params: [
    jsExpression({
      name: 'data',
      help: 'You may use json, js function or expression',
      value: JSON.stringify({ foo: 'bar' }, null, 2),
    }),
  ],

  async *run({ output, params }) {
    const parsed = params.data as object

    output.push(
      // wraps the parsed json in an array if it's not already an array
      [parsed].flat(),
    )
  },
};
