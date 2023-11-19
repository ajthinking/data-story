
import { string } from '../../../ParamBuilder';
import { promises as fs } from 'fs'
import * as nodePath from 'path'
import { ComputerConfig } from '../../../types/ComputerConfig';

export const ListFiles: ComputerConfig = {
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
  params: [
    {
      name: 'path',
      label: 'Path',
      help: 'Dir to list',
      inputMode: {
        type: 'Stringable',
        selected: true,
        multiline: true,
        canInterpolate: false,
        interpolate: false,
        evaluations: [],
        casts: [],
        value: '/',
      },
      alternativeInputModes: [],
    }    
  ],

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
};
