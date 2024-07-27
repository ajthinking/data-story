import { Computer } from '../types/Computer';

export const InstantThrow: Computer = {
  name: 'InstantThrow',
  label: 'InstantThrow',
  inputs: [],
  outputs: [],
  params: [],

  async *run({}) {
    throw Error('Instant Error!')
  },
};