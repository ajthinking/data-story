import { ItemWithParams } from '../ItemWithParams/ItemWithParams';
import { numberCast } from '../Param/casts/numberCast';
import { stringCast } from '../Param/casts/stringCast';
import { hjsonEvaluation } from '../Param/evaluations/hjsonEvaluation';
import { jsFunctionEvaluation } from '../Param/evaluations/jsFunctionEvaluation';
import { jsonEvaluation } from '../Param/evaluations/jsonEvaluation';
import { createDefaultStringable } from '../Param';
import { Computer } from '../types/Computer';

export const ConsoleLog: Computer = {
  name: 'ConsoleLog',
  label: 'Console.log',
  tags: [],
  inputs: [
    {
      name: 'input',
      schema: {}
    }
  ],
  outputs: [],
  params: [
    createDefaultStringable( {
      name: 'message',
      label: 'message',
      help: 'What to log. Leave blank to log the whole item.',
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
      value: '',
    })
  ],

  async *run({ input, hooks, params: rawParams }) {
    console.log('ConsoleLog running')
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
