
import { json, string } from '../../ParamBuilder';
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
      inputMode: {
        type: 'Stringable',
        selected: true,
        multiline: true,
        canInterpolate: false,
        interpolate: false,
        evaluations: [],
        casts: [],
        value: '',
      },
      alternativeInputModes: [],
    }    
  ],

  async *run({}) {},
};
