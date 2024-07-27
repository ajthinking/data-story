import { Computer, createDefaultStringable } from '@data-story/core';
import { promises as fs } from 'fs'
import * as nodePath from 'path'

export const ListFiles: Computer = {
  name: 'ListFiles',
  label: 'ListFiles',
  inputs: [{
    name: 'input',
    schema: {},
  }],
  outputs: [{
    name: 'output',
    schema: {
      name: 'string',
      type: 'string',
      fullPath: 'string',
    }
  }],
  params: [
    createDefaultStringable({
      name: 'path',
      label: 'Path',
      help: 'Dir to list',
      multiline: true,
      canInterpolate: false,
      interpolate: false,
      evaluations: [],
      casts: [],
      value: '/',
    })
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
