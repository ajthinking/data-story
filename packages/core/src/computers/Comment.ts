import { ComputerConfig } from '../types/ComputerConfig';
import { multiline } from '../utils/multiline';
import { createDefaultStringable } from '../Param';

export const Comment: ComputerConfig = {
  name: 'Comment',
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
      `
    })
  ],

  async *run({}) {},
};
