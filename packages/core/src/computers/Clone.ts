import { num } from '../Param';
import { Computer } from '../types/Computer';
import { ItemValue } from '../types/ItemValue';
import { BatchLimit } from '../utils/batchLimit';

export const Clone: Computer = {
  name: 'Clone',
  label: 'Clone',
  inputs: [
    {
      name: 'input',
      schema: {},
    },
  ],
  outputs: [
    {
      name: 'clones',
      schema: {},
    },
    {
      name: 'original',
      schema: {},
    },
  ],
  params: [
    num({
      name: 'count',
      help: 'How many clones to make?',
      value: 10,
    }),
  ],

  async *run({ input, output, params }) {
    while (true) {
      const incoming = input.pull(BatchLimit);
      output.pushTo('original', incoming);

      const count = Number(params.count);
      const clones: ItemValue[] = [];
      const BATCH_SIZE = 10000;

      for (let i = 0; i < count; i++) {
        for (const item of incoming) {
          const clonedItem = Object.assign({}, item.value, { _clone_id: i });
          clones.push(clonedItem);

          // Push in batches to manage memory
          if (clones.length >= BATCH_SIZE) {
            output.pushTo('clones', clones.splice(0, BATCH_SIZE));
          }
        }
      }

      // Push any remaining clones
      if (clones.length > 0) {
        output.pushTo('clones', clones);
      }

      // Clear large arrays to free memory
      incoming.length = 0;
      clones.length = 0;

      yield;
    }
  },

};
