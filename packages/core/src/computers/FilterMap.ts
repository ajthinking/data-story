import { jsFn } from '../Param';
import { multiline } from '../utils/multiline';
import { Computer } from '../types/Computer';
import { BatchLimit } from '../utils/batchLimit';

export const FilterMap: Computer = {
  type: 'Computer',
  computerType: 'FilterMap',
  label: 'FilterMap',
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

  async *run({ input, output }) {
    while(true) {
      const incoming = input.pull(BatchLimit)
      const replacers = incoming
        .map(item => item.params.mapper)
        .filter(Boolean)

      output.push(replacers)

      yield;
    }
  },
};
