import { multiline } from '../utils/multiline';
import { createDefaultStringable } from '../Param';
import { Computer } from '../types/Computer';

export const Comment: Computer = {
  name: 'Comment',
  label: 'Comment',
  inputs: [],
  outputs: [],
  params: [
    createDefaultStringable( {
      name: 'content',
      label: 'Content',
      help: 'Markdown content',
      multiline: true,
      canInterpolate: false,
      interpolate: false,
      evaluations: [],
      casts: [],
      value: multiline`
        ### Comment
        paragraph
      `,
    }),
  ],

  async *run({}) {},
};
