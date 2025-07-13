import { NodeRunError } from '../NodeRunError';
import { numberCast } from '../Param/casts/numberCast';
import { stringCast } from '../Param/casts/stringCast';
import { jsFunctionEvaluation } from '../Param/evaluations/jsFunctionEvaluation';
import { jsonEvaluation } from '../Param/evaluations/jsonEvaluation';
import { str } from '../Param';
import { Computer } from '../types/Computer';

export const Throw: Computer = {
  type: 'Throw',
  label: 'Throw',
  inputs: [{
    name: 'input',
    schema: {},
  }],
  outputs: [],
  params: [
    str({
      name: 'message',
      label: 'message',
      help: 'What to throw',
      multiline: false,
      canInterpolate: true,
      interpolate: true,
      evaluations: [
        jsFunctionEvaluation,
        jsonEvaluation,
      ],
      value: 'Some error',
    }),
  ],

  async *run({ input, node }) {
    const [item] = input.pull(1)
    const fuck = item.params.message
    throw new NodeRunError({
      message: item.params.message,
      node,
    })
  },
};
