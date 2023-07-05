import { ComputerConfigFactory, RunArgs } from '../../types/Computer';
import { ComputerConfig } from '../../types/ComputerConfig';

export const Ignore: ComputerConfigFactory = (): ComputerConfig => ({
  name: 'Ignore',
  inputs: ['input'],

  async *run({ input }) {
    while(true) {
      input.pull()
      yield;
    }
  },
});
