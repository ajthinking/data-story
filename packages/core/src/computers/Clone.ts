import { ComputerConfig } from '../types/ComputerConfig';
import { numberCast } from '../Param/casts/numberCast';
import { num } from '../Param';

export const Clone: ComputerConfig = {
  name: 'Clone',
  inputs: ['input'],
  outputs: ['original', 'clones'],
  params: [
    num({
      name: 'count',
      help: 'How many clones to make?',
      value: 10,
    }),
  ],

  async *run({ input, output, params }) {
    while(true) {
      const incoming = input.pull()
      output.pushTo('original', incoming)

      const count = Number(params.count)

      for (let i = 0; i < count; i++) {
        output.pushTo('clones', incoming.map(item => ({
          ...item.value,
          _clone_id: i,
        })))
      }

      yield;
    }
  },
};
