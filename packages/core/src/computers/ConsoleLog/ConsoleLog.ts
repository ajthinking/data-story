
import { ItemWithParams } from '../../ItemWithParams/ItemWithParams';
import { numberCast } from '../../Param/casts/numberCast';
import { stringCast } from '../../Param/casts/stringCast';
import { hjsonEvaluation } from '../../Param/evaluations/hjsonEvaluation';
import { jsEvaluation } from '../../Param/evaluations/jsEvaluation';
import { jsonEvaluation } from '../../Param/evaluations/jsonEvaluation';
import { ComputerConfig } from '../../types/ComputerConfig';

export const ConsoleLog: ComputerConfig = {
  name: 'ConsoleLog',
  label: 'Console.log',
  inputs: ['input'],

  params: [
    {
      name: 'message',
      label: 'message',
      help: 'What to log. Leave blank to log the whole item.',
      inputMode: {
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
        value: '',
      },
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
