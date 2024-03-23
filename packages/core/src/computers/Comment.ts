import { ComputerConfig } from '../types/ComputerConfig';
import { multiline } from '../utils/multiline';

export const Comment: ComputerConfig = {
  name: 'Comment',
  inputs: [],
  outputs: [],
  params: [
    {
      name: 'content',
      label: 'Content',
      help: 'Markdown content',
      type: 'StringableParam',
      multiline: true,
      canInterpolate: false,
      interpolate: false,
      evaluations: [],
      casts: [],
      value: multiline`
        ### Comment
        paragraph
      `,
    }
  ],

  async *run({}) {},
};
