import { Computer } from '../types/Computer';

export const InstantThrow: Computer = {
  name: 'InstantThrow',
  label: 'InstantThrow',
  tags: [],
  inputs: [],
  outputs: [],
  params: [],

  async *run({}) {
    throw Error('Instant Error!')
  },
};