import { sleep } from '../utils/sleep';
import { num } from '../Param';
import { Computer } from '../types/Computer';

export const Sleep: Computer = {
  type: 'Computer',
  computerType: 'Sleep',
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
    num({
      name: 'duration',
      label: 'Duration',
      help: 'How many ms to sleep?',
      multiline: false,
      canInterpolate: true,
      interpolate: true,
      value: 100,
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
