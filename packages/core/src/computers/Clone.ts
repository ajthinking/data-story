import { numberCast } from '../Param/casts/numberCast';
import { num } from '../Param';
import { Computer } from '../types/Computer';

export const Clone: Computer = {
  name: 'Clone',
  label: 'Clone',
  inputs: [
    {
      name: 'input',
      schema: {}
    }
  ],
  outputs: [
    {
      name: 'clones',
      schema: {}
    },
    {
      name: 'original',
      schema: {}
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
      const startTime = Date.now();

      const incoming = input.pull();
      output.pushTo('original', incoming);

      const count = Number(params.count);
      const clones = [];
      const BATCH_SIZE = 10000; // Adjust based on your memory constraints

      for (let i = 0; i < count; i++) {
        for (const item of incoming) {
          // Efficient object cloning without spread operator
          const clonedItem = Object.assign({}, item.value, { _clone_id: i });
          clones.push(clonedItem);

          // Push in batches to manage memory
          if (clones.length >= BATCH_SIZE) {
            await output.pushTo('clones', clones.splice(0, BATCH_SIZE));
          }
        }
      }

      // Push any remaining clones
      if (clones.length > 0) {
        await output.pushTo('clones', clones);
      }

      // Clear large arrays to free memory
      incoming.length = 0;
      clones.length = 0;

      const endTime = Date.now();
      console.log('Clone time:', endTime - startTime, 'ms');

      yield;
    }
  },

};
