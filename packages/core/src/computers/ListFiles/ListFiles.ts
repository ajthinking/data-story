import { ComputerConfigFactory, RunArgs } from '../../types/Computer';
import { string } from '../../ParamBuilder';
import { promises as fs } from 'fs'
import * as nodePath from 'path'
import { ComputerConfig } from '../../types/ComputerConfig';

export const ListFiles: ComputerConfigFactory = (): ComputerConfig => ({
  name: 'ListFiles',
  inputs: ['input'],
  outputs: [{
    name: 'output',
    schema: {
      name: 'string',
      type: 'string',
      fullPath: 'string',
    }
  }],
  params: {
    path: string('path').value('/').get(),
  },

  async *run({ input, output }) {
    while(true) {
      const [ { params: { path } } ] = input.pull(1)

      const entries = (await fs.readdir(path, { withFileTypes: true }))
        .map((entry) => {
          return {
            name: entry.name,
            type: entry.isDirectory() ? 'directory' : 'file',
            fullPath: nodePath.join(path, entry.name),
          };
      });      

      output.push(entries)

      yield;
    }
  },
});
