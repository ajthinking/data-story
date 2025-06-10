import { numberCast } from '../Param/casts/numberCast';
import { stringCast } from '../Param/casts/stringCast';
import { jsFunctionEvaluation } from '../Param/evaluations/jsFunctionEvaluation';
import { jsonEvaluation } from '../Param/evaluations/jsonEvaluation';
import { str } from '../Param';
import { Computer } from '../types/Computer';

export const ConsoleLog: Computer = {
  name: 'ConsoleLog',
  label: 'Console.log',
  inputs: [
    {
      name: 'input',
      schema: {},
    },
  ],
  outputs: [],
  params: [
    str( {
      name: 'message',
      label: 'message',
      help: 'What to log. Leave blank to log the whole item.',
      multiline: false,
      canInterpolate: true,
      interpolate: true,
      evaluations: [
        jsFunctionEvaluation,
        jsonEvaluation,
      ],
      value: '',
    }),
  ],

  async *run({ input, hooks, params: rawParams }) {},
};
