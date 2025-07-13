import { Computer } from '../types/Computer';
import { BatchLimit } from '../utils/batchLimit';

export const Ignore: Computer = {
  type: 'Ignore',
  label: 'Ignore',
  inputs: [{
    name: 'input',
    schema: {},
  }],
  outputs: [],
  params: [],

  async *run({ input }) {
    while(true) {
      input.pull(BatchLimit)
      yield;
    }
  },
}
