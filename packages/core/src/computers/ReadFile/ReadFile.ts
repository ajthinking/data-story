import { ComputerConfigFactory } from '../../types/Computer';
import { string } from '../../ParamBuilder';
import { ComputerConfig } from '../../types/ComputerConfig';
import { promises as fs } from 'fs';

export const ReadFile: ComputerConfigFactory = (): ComputerConfig => ({
  name: 'ReadFile',
  inputs: ['input'],
  outputs: ['output'],
  params: {
    path: string('path').get(),
  },

  async *run({ input, output }) {
    const [ { params: { path } } ] = input.pull(1)

    const readData = await fs.readFile(path, 'utf-8')

    output.push([readData])
  },
});