
import { ComputerConfig } from '@data-story/core';

export const LimeDummy: ComputerConfig = {
  name: 'LimeDummy',
  inputs: ['input'],
  outputs: [{
    name: 'output',
    schema: {}
  }],
  params: {
    // TODO
  },

  async *run({ input, output }) {
    // TODO
  },
};
