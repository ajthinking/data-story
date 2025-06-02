import { multiline } from '../utils/multiline';
import { str } from '../Param';
import { Computer } from '../types/Computer';

export const Comment: Computer = {
  name: 'Comment',
  label: 'Comment',
  inputs: [],
  outputs: [],
  params: [
    str( {
      name: 'content',
      label: 'Content',
      help: 'Markdown content',
      multiline: true,
      canInterpolate: false,
      interpolate: false,
      evaluations: [],
      value: multiline`
        ### Comment
        paragraph
      `,
    }),
  ],

  async *run({}) {},
};
