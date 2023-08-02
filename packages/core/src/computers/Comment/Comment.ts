
import { json, string } from '../../ParamBuilder';
import { ComputerConfig } from '../../types/ComputerConfig';

export const Comment: ComputerConfig = {
  name: 'Comment',
  inputs: [],
  outputs: [],
  params: {
    content: json('content').value('This is a comment').get(),
  },

  async *run({}) {},
};
