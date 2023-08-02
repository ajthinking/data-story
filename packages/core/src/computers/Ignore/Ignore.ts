
import { ComputerConfig } from '../../types/ComputerConfig';

export const Ignore: ComputerConfig = {
  name: 'Ignore',
  inputs: ['input'],

  async *run({ input }) {
    while(true) {
      input.pull()
      yield;
    }
  },
};
