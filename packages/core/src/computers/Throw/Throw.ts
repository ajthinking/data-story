
import { NodeRunError } from '../../NodeRunError';
import { string } from '../../ParamBuilder';
import { HjsonEvaluation, JsEvaluation, JsonEvaluation, NumberCast, StringCast } from '../../ParamV3';
import { ComputerConfig } from '../../types/ComputerConfig';

export const Throw: ComputerConfig = {
  name: 'Throw',
  inputs: ['input'],
  params: [
    {
      name: 'message',
      label: 'message',
      help: 'What to throw',
      inputMode: {
        type: 'Stringable',
        selected: true,
        multiline: false,
        canInterpolate: true,
        interpolate: true,
        evaluations: [
          JsEvaluation,
          JsonEvaluation,
          HjsonEvaluation,
        ],
        casts: [
          NumberCast,
          StringCast,
        ],
        value: 'Some error',
      },
      alternativeInputModes: [],
    }
  ],

  async *run({ input, node }) {
    const [item] = input.pull(1)
    throw new NodeRunError({
      message: item.params.message,
      node,
    })
  },
};
