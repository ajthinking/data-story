
import { ComputerConfig } from '../../types/ComputerConfig';
import { json_ } from '../../Param';

export const CreateJson: ComputerConfig = {
  name: 'CreateJson',
  outputs: ['output'],
  params: [
    json_({
      name: 'json',
      value: JSON.stringify({ foo: 'bar' }, null, 2)
    })
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
