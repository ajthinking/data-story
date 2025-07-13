import { json_ } from '../Param';
import { Computer } from '../types/Computer';
import { BatchLimit } from '../utils/batchLimit';

export const FlatMap: Computer = {
  type: 'FlatMap',
  label: 'FlatMap',
  inputs: [{
    name: 'input',
    schema: {},
  }],
  outputs: [{
    name: 'output',
    schema: {},
  }],
  params: [
    json_({
      name: 'json',
      value: '[{\n\tfoo: bar\n}]',
      help: '',
    }),
  ],

  async *run({ input, output, params }) {
    while(true) {
      const incoming = input.pull(BatchLimit)

      const replacers = incoming.flatMap(item => {
        return item.params.json as Object;
      })

      output.push(replacers)

      yield;
    }
  },
};
