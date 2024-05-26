import { json_ } from '../Param';
import { jsFunctionEvaluation } from '../Param/evaluations/jsFunctionEvaluation';
import { jsonEvaluation } from '../Param/evaluations/jsonEvaluation';
import { hjsonEvaluation } from '../Param/evaluations/hjsonEvaluation';
import { ComputerConfig } from '../types/ComputerConfig';
import { ItemValue } from '../types/ItemValue';
import { merge } from '../utils/merge';
import { multiline } from '../utils/multiline';

export const FlatMap: ComputerConfig = {
  name: 'FlatMap',
  docs: multiline`
  Replaces the item with a new value. Supported input are: HJSON, JSON and JS function
  `,
  inputs: ['input'],
  outputs: ['output'],
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
