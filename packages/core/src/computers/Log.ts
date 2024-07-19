import { Computer } from '../types/Computer';

export const Log: Computer = {
  name: 'Log',
  label: 'Log',
  tags: [],
  inputs: [{
    name: 'input',
    schema: {},
  }],
  outputs: [],
  params: [],

  async *run({ input, output }) {
    while(true) {
      // log the *item* - not ItemWithParams
      const incoming = input.pull().map(i => i.value)
      console.log(JSON.stringify(incoming, null, 2))

      yield;
    }
  },
};