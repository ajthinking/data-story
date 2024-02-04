import { ComputerConfig } from '../types/ComputerConfig';

export const InstantThrow: ComputerConfig = {
  name: 'InstantThrow',

  async *run({}) {
    throw Error('Instant Error!')
  },
};