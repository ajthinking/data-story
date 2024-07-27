import { json_ } from '../Param';
import { jsFunctionEvaluation } from '../Param/evaluations/jsFunctionEvaluation';
import { jsonEvaluation } from '../Param/evaluations/jsonEvaluation';
import { hjsonEvaluation } from '../Param/evaluations/hjsonEvaluation';
import { ItemValue } from '../types/ItemValue';
import { merge } from '../utils/merge';
import { multiline } from '../utils/multiline';
import { Computer } from '../types/Computer';

export const FlatMap: Computer = {
  name: 'FlatMap',
  label: 'FlatMap',
  inputs: [{
    name: 'input',
    schema: {}
  }],
  outputs: [{
    name: 'output',
    schema: {}
  }],
  params: [
    json_({
      name: 'json',
      value: '[{\n\tfoo: bar\n}]',
      help: '',
    })
  ],

  async *run({ input, output, params }) {
    while(true) {
      const incoming = input.pull()

      const replacers = incoming.flatMap(item => {
        return item.params.json as Object;
      })

      output.push(replacers)

      yield;
    }
  },
};
