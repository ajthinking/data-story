import { jsFn, json_ } from '../Param';
import { jsFunctionEvaluation } from '../Param/evaluations/jsFunctionEvaluation';
import { jsonEvaluation } from '../Param/evaluations/jsonEvaluation';
import { hjsonEvaluation } from '../Param/evaluations/hjsonEvaluation';
import { ItemValue } from '../types/ItemValue';
import { merge } from '../utils/merge';
import { multiline } from '../utils/multiline';
import { Computer } from '../types/Computer';

export const Map: Computer = {
  name: 'Map',
  label: 'Map',
  inputs: [{
    name: 'input',
    schema: {}
  }],
  outputs: [{
    name: 'output',
    schema: {}
  }],
  params: [
    jsFn({
      name: 'mapper',
      value: multiline`
        item => ({
          ...item
        })
      `,
      help: '',
    })
  ],

  async *run({ input, output, params }) {
    while(true) {
      const incoming = input.pull()

      const replacers = incoming.map(item => item.params.mapper) as ItemValue[]

      output.push(replacers)

      yield;
    }
  },
};
