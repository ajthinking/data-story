import { Computer } from '../types/Computer';

export const InstantThrow: Computer = {
  type: 'Computer',
  computerType: 'InstantThrow',
  label: 'InstantThrow',
  inputs: [],
  outputs: [],
  params: [],

  async *run({}) {
    throw Error('Instant Error!')
  },
};