import { ComputerConfig } from '../types/ComputerConfig';

export const Table: ComputerConfig = {
  name: 'Table',
  inputs: ['input'],

  async *run({ input, hooks, params: rawParams, node, storage }) {
    while(true) {
      const incoming = input.pull()

      storage!.items.set(
        node.id,
        incoming.map(i => i.value)
      )

      yield;
    }
  },
};
