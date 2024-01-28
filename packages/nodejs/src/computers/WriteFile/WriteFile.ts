import { promises as fs } from 'fs';
import { ComputerConfig, str } from '@data-story/core';

export const WriteFile: ComputerConfig = {
  name: 'WriteFile',
  inputs: [{
    name: 'input',
    schema: {}
  }],
  params: [
    str({
      name: 'path',
      label: 'Path',
      help: 'File path',
      value: '${path}/output.txt',
    }),
    str({
      name: 'content',
      label: 'Content',
      help: 'File content',
      value: 'Hello world!',
    }),
  ],

  async *run({ input, output }) {
    const [ incoming ] = input.pull(1)

    const path = incoming.params.path as string
    const content = incoming.params.content as string

    await fs.writeFile(path, content, 'utf-8')
  },
};