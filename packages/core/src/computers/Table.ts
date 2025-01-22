import { num, str, strList } from '../Param';
import { Computer } from '../types/Computer';

export const Table: Computer = {
  name: 'Table',
  label: 'Table',
  inputs: [{
    name: 'input',
    schema: {},
  }],
  outputs: [],
  params: [
    strList({
      name: 'only',
      help: 'If set, only the specified paths will be shown. Use comma separation',
      value: '',
    }),
    strList({
      name: 'drop',
      help: 'If set, the specified paths will be dropped. Use comma separation',
      value: '',
    }),
  ],

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
