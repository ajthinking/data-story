
import { ItemWithParams } from '../../ItemWithParams/ItemWithParams';
import { HjsonEvaluation, JsEvaluation, JsonEvaluation, NumberCast, StringCast } from '../../Param';
import { ComputerConfig } from '../../types/ComputerConfig';

export const ConsoleLog: ComputerConfig = {
  name: 'ConsoleLog',
  label: 'Console.log',
  inputs: ['input'],

  params: [
    {
      name: 'message',
      label: 'message',
      help: 'What to log',
      inputMode: {
        type: 'Stringable',
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
        value: '',
      },
      alternativeInputModes: [],
    }
  ],

  async *run({ input, hooks, params: rawParams }) {
    while(true) {
      const incoming = input.pull() as ItemWithParams[]

      for(const item of incoming) {
        hooks.register({
          type: 'CONSOLE_LOG',
          args: [
            // If nothing passed log the whole item 
            !rawParams.message
              ? item.value
              : item.params.message
          ]
        })
      }

      yield;
    }
  },
};
