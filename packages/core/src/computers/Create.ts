import { ComputerConfig } from '../types/ComputerConfig';
import { json_ } from '../Param';
import { jsonEvaluation } from '../Param/evaluations/jsonEvaluation';
import { hjsonEvaluation } from '../Param/evaluations/hjsonEvaluation';
import { jsFunctionEvaluation } from '../Param/evaluations/jsFunctionEvaluation';
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
        { ...hjsonEvaluation, selected: true },
        jsonEvaluation,
        jsFunctionEvaluation,
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
