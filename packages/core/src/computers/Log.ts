import { Computer } from '../types/Computer';
import { BatchLimit } from '../utils/batchLimit';

export const Log: Computer = {
  type: 'Computer',
  computerType: 'Log',
  label: 'Log',
  inputs: [{
    name: 'input',
    schema: {},
  }],
  outputs: [],
  params: [],

  async *run({ input, output }) {
    while(true) {
      // log the *item* - not ItemWithParams
      const incoming = input.pull(BatchLimit).map(i => i.value)
      console.log(JSON.stringify(incoming, null, 2))

      yield;
    }
  },
};