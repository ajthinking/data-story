import { ComputerConfigFactory, RunArgs } from '../../types/Computer';
import { json, string } from '../../ParamBuilder';
import { ComputerConfig } from '../../types/ComputerConfig';

export const Comment: ComputerConfigFactory = (): ComputerConfig => ({
  name: 'Comment',
  inputs: [],
  outputs: [],
  params: {
    content: json('content').value('This is a comment').get(),
  },

  async *run({}) {},
});
