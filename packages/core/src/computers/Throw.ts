import { NodeRunError } from '../NodeRunError';
import { numberCast } from '../Param/casts/numberCast';
import { stringCast } from '../Param/casts/stringCast';
import { hjsonEvaluation } from '../Param/evaluations/hjsonEvaluation';
import { jsFunctionEvaluation } from '../Param/evaluations/jsFunctionEvaluation';
import { jsonEvaluation } from '../Param/evaluations/jsonEvaluation';
import { createDefaultStringable } from '../Param';
import { Computer } from '../types/Computer';

export const Throw: Computer = {
  name: 'Throw',
  label: 'Throw',
  inputs: [{
    name: 'input',
    schema: {},
  }],
  outputs: [],
  params: [
    createDefaultStringable({
      name: 'message',
      label: 'message',
      help: 'What to throw',
      multiline: false,
      canInterpolate: true,
      interpolate: true,
      evaluations: [
        jsFunctionEvaluation,
        jsonEvaluation,
        hjsonEvaluation,
      ],
      casts: [
        numberCast,
        stringCast,
      ],
      value: 'Some error',
    }),
  ],

  async *run({ input, node }) {
    const [item] = input.pull(1)
    throw new NodeRunError({
      message: item.params.message as string,
      node,
    })
  },
};
