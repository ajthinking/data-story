import { string } from '../../ParamBuilder';
import { ComputerConfig } from '../../types/ComputerConfig';
import { promises as fs } from 'fs';

export const ReadFile: ComputerConfig = {
  name: 'ReadFile',
  inputs: ['input'],
  outputs: ['output'],
  params: {
    path: string('path').get(),
  },

  async *run({ input, output }) {
    const [ { params: { path } } ] = input.pull(1)

    const content = await fs.readFile(path, 'utf-8')

    output.push([{ content }])
  },
};