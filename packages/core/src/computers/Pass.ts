import { Computer } from '../types/Computer';

export const Pass: Computer = {
  name: 'Pass',
  label: 'Pass',
  tags: [],
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
      const incoming = input.pull()
      output.push(incoming)

      yield;
    }
  },
};
