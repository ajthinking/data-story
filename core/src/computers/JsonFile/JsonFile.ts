import { ComputerConfigFactory, RunArgs } from '../../types/Computer';
import { string } from '../../ParamBuilder';
import { promises as fs } from 'fs'
import { ComputerConfig } from '../../types/ComputerConfig';

export const JsonFile: ComputerConfigFactory = (): ComputerConfig => ({
  name: 'JsonFile',
  outputs: ['items', 'error'],
  params: {
    path: string('path').value('./.datastory/data/names.json').get(),
  },

  // TODO: Consider reading using a stream/generator
  async *run({ output, params }) {
    try {
      const content = await fs.readFile(params.path, 'utf8')
      const parsed = JSON.parse(content)
      const items = Array.isArray(parsed) ? parsed : [parsed];
      
      output.pushTo('items', items)
    } catch(error) {
      output.pushTo('error', [{
        error: (error as Error).message
      }])
    }

    yield;
  },
});
