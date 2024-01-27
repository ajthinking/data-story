
import { ComputerConfig } from '../../types/ComputerConfig';

export const Comment: ComputerConfig = {
  name: 'Comment',
  inputs: [],
  outputs: [],
  params: [
    {
      name: 'content',
      label: 'Content',
      help: 'Markdown content',
      type: 'Stringable',
      multiline: true,
      canInterpolate: false,
      interpolate: false,
      evaluations: [],
      casts: [],
      value: '',
    }    
  ],

  async *run({}) {},
};
