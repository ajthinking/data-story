import { jsFn } from '../Param';
import { ItemValue } from '../types/ItemValue';
import { multiline } from '../utils/multiline';
import { Computer } from '../types/Computer';
import { BatchLimit } from '../utils/batchLimit';

export const Map: Computer = {
  name: 'Map',
  label: 'Map',
  inputs: [{
    name: 'input',
    schema: {},
  }],
  outputs: [{
    name: 'output',
    schema: {},
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
    }),
  ],

  async *run({ input, output, params }) {
    while(true) {
      const incoming = input.pull(BatchLimit)
      const replacers = incoming.map(item => item.params.mapper) as ItemValue[]
      output.push(replacers)

      yield;
    }
  },
};
