import { ComputerConfigFactory, RunArgs } from '../../types/Computer';
import { json } from '../../ParamBuilder';
import { ComputerConfig } from '../../types/ComputerConfig';

export const CreateJson: ComputerConfigFactory = (): ComputerConfig => ({
  name: 'CreateJson',  
  outputs: ['output'],
  params: {
    json: json('json').value(JSON.stringify(
      [{ "path": "/Users/anders/Code/data-story/core/computers"}]
    )).get(),
  },

  async *run({ output, params: { json } }) {
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
});
