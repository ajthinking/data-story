import { Computer } from '../types/Computer';

export const Table: Computer = {
  name: 'Table',
  label: 'Table',
  inputs: [{
    name: 'input',
    schema: {},
  }],
  outputs: [],
  params: [],

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
