
import { ComputerConfig } from '../types/ComputerConfig';

export const Peek: ComputerConfig = {
  name: 'Peek',
  inputs: ['input'],

  async *run({ input, hooks, params: rawParams, node }) {
    while(true) {
      const incoming = input.pull()

      hooks.register({
        type: 'PEEK',
        args: [ node.id, incoming.map(i => i.value) ]
      })

      yield;
    }
  },
};
