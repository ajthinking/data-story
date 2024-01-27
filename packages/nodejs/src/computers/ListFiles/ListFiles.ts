import { ComputerConfig } from '@data-story/core';
import { promises as fs } from 'fs'
import * as nodePath from 'path'

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
      type: 'Stringable',
      multiline: true,
      canInterpolate: false,
      interpolate: false,
      evaluations: [],
      casts: [],
      value: '/',
    }    
  ],

  async *run({ input, output }) {
    while(true) {
      const [ incoming ] = input.pull(1)
      const path = incoming.params.path as string

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
