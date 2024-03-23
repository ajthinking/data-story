import { ComputerConfig } from '../types/ComputerConfig';

export const Table: ComputerConfig = {
  name: 'Table',
  inputs: ['input'],

  async *run({ input, hooks, params: rawParams, node }) {
    while(true) {
      const incoming = input.pull()

      hooks.register({
        type: 'TABLE',
        args: [ node.id, incoming.map(i => i.value) ]
      })

      yield;
    }
  },
};
