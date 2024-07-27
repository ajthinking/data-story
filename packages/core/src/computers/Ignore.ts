import { Computer } from '../types/Computer';

export const Ignore: Computer = {
  name: 'Ignore',
  label: 'Ignore',
  inputs: [{
    name: 'input',
    schema: {},
  }],
  outputs: [],
  params: [],

  async *run({ input }) {
    while(true) {
      input.pull()
      yield;
    }
  },
}
