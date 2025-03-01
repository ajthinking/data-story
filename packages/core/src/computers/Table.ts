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
    str({
      name: 'destructObjects',
      help: 'If set, objects will be destructured',
      value: 'true',
    }),
  ],

  async* run({ input, hooks, params: rawParams, node, storage }) {
    while(true) {
      const existingItems = storage!.itemsMap.get(node.id) || []
      const newItems = input.pull().map(i => i.value)
      const allItems = existingItems.concat(newItems)

      storage!.itemsMap.set(node.id, allItems)

      yield;
    }
  },
};
