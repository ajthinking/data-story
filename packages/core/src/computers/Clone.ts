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
