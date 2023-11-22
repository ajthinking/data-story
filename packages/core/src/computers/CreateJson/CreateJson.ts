
import { ComputerConfig } from '../../types/ComputerConfig';
import { StringCast } from '../../Param';

export const CreateJson: ComputerConfig = {
  name: 'CreateJson',  
  outputs: ['output'],
  params: [
    {
      name: 'json',
      label: 'JSON',
      help: 'Enter JSON', 
      inputMode: {
        type: 'Stringable',
        multiline: true,
        canInterpolate: true,
        interpolate: true,
        casts: [
          {...StringCast, selected: true}
        ],
        value: JSON.stringify({ foo: 'bar' }, null, 2)
      },
      alternativeInputModes: []
    },    
  ],

  async *run({ output, params }) {
    const json = params.json as string

    try {
      const parsed = JSON.parse(json)
      output.push(
        // wraps the parsed json in an array if it's not already an array
        [parsed].flat()
      )
    } catch(error) {
      throw error;
    }
  },
};
