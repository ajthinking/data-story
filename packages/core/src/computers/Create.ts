import { ComputerConfig } from '../types/ComputerConfig';
import { json_ } from '../Param';
import { jsonEvaluation } from '../Param/evaluations/jsonEvaluation';
import { hjsonEvaluation } from '../Param/evaluations/hjsonEvaluation';
import { jsEvaluation } from '../Param/evaluations/jsEvaluation';
import { jsExpressionEvaluation } from '../Param/evaluations/jsExpressionEvaluation';

export const Create: ComputerConfig = {
  name: 'Create',
  outputs: ['output'],
  params: [
    json_({
      name: 'data',
      help: 'You may use json, hson js function or expression',
      value: JSON.stringify({ foo: 'bar' }, null, 2),
      evaluations: [
        { ...jsonEvaluation, selected: true },
        hjsonEvaluation,
        jsEvaluation,
        jsExpressionEvaluation,
      ]
    })
  ],

  async *run({ output, params }) {
    const parsed = params.data as object

    output.push(
      // wraps the parsed json in an array if it's not already an array
      [parsed].flat()
    )
  },
};
