import { ComputerConfig } from '../types/ComputerConfig';

export const Table: ComputerConfig = {
  name: 'Table',
  inputs: ['input'],

  async* run({ input, hooks, params: rawParams, node, storage }) {
    while(true) {
      const incoming = input.pull()

      storage!.itemsMap.set(
        node.id,
        (storage!.itemsMap.get(node.id) || []).concat(incoming.map(i => i.value))
      )

      yield;
    }
  },
};
