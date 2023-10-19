
import { ComputerConfig } from '@data-story/core';

export const HubSpotDummy: ComputerConfig = {
  name: 'HubSpotDummy',
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
