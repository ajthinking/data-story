import { sleep } from '../utils/sleep';
import { numberCast } from '../Param/casts/numberCast';
import { createDefaultStringable } from '../Param';
import { Computer } from '../types/Computer';

export const Sleep: Computer = {
  name: 'Sleep',
  label: 'Sleep',
  inputs: [{
    name: 'input',
    schema: {},
  }],
  outputs: [{
    name: 'output',
    schema: {},
  }],
  params: [
    createDefaultStringable({
      name: 'duration',
      label: 'Duration',
      help: 'How many ms to sleep?',
      multiline: false,
      canInterpolate: true,
      interpolate: true,
      casts: [
        { ...numberCast, selected: true },
      ],
      value: String(100),
    }),
  ],

  async *run({ input, output }) {
    while(true) {
      const [ incoming ] = input.pull(1)
      const duration = Number(incoming.params.duration)

      await sleep(duration)
      output.push([incoming])

      yield;
    }
  },
};
