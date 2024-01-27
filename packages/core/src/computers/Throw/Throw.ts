
import { NodeRunError } from '../../NodeRunError';
import { numberCast } from '../../Param/casts/numberCast';
import { stringCast } from '../../Param/casts/stringCast';
import { hjsonEvaluation } from '../../Param/evaluations/hjsonEvaluation';
import { jsEvaluation } from '../../Param/evaluations/jsEvaluation';
import { jsonEvaluation } from '../../Param/evaluations/jsonEvaluation';
import { ComputerConfig } from '../../types/ComputerConfig';

export const Throw: ComputerConfig = {
  name: 'Throw',
  inputs: ['input'],
  params: [
    {
      name: 'message',
      label: 'message',
      help: 'What to throw',
      type: 'Stringable',
      multiline: false,
      canInterpolate: true,
      interpolate: true,
      evaluations: [
        jsEvaluation,
        jsonEvaluation,
        hjsonEvaluation,
      ],
      casts: [
        numberCast,
        stringCast,
      ],
      value: 'Some error',
    }
  ],

  async *run({ input, node }) {
    const [item] = input.pull(1)
    throw new NodeRunError({
      message: item.params.message as string,
      node,
    })
  },
};
