import { Computer } from '../types/Computer';
import { BatchLimit } from '../utils/batchLimit';

export const Pass: Computer = {
  name: 'Pass',
  label: 'Pass',
  inputs: [{
    name: 'input',
    schema: {},
  }],
  outputs: [{
    name: 'output',
    schema: {},
  }],
  params: [],

  async *run({ input, output }) {
    while(true) {
      const incoming = input.pull(BatchLimit)
      output.push(incoming)

      yield;
    }
  },
};
