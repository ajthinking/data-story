import { ComputerConfigFactory, RunArgs } from '../../types/Computer';
import { sleep } from '../../utils/sleep';
import { ComputerConfig } from '../../types/ComputerConfig';

export const InstantThrow: ComputerConfigFactory = (): ComputerConfig => ({
  name: 'InstantThrow',

  async *run({}) {
    throw Error("Instant Error!")
  },
});