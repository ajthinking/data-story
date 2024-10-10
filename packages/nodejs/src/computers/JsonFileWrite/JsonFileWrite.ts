import { promises as fs } from 'fs';
import { Computer, str } from '@data-story/core';
import * as path from 'path';

export const JsonFileWrite: Computer = {
  name: 'JsonFile.write',
  label: 'JsonFile.write',
  category: 'NodeJs',
  inputs: [{
    name: 'input',
    schema: {}
  }],
  outputs: [],
  params: [
    str({
      name: 'file_path',
      label: 'File Path',
      help: 'File path',
    }),
  ],

  canRun({ input }) {
    return input.haveAllItemsAtInput('input')
  },

  async *run({ input, params }) {
    const incoming = input.pull()

    const filePath = params.file_path as string
    const content = JSON.stringify(incoming.map(i => i.value), null, 2)

    const root = process.env.WORKSPACE_FOLDER_PATH;
    if(!root) throw new Error('WORKSPACE_FOLDER_PATH not set')

    const fullPath = path.join(root, filePath)
    await fs.mkdir(path.dirname(fullPath), { recursive: true })
    await fs.writeFile(fullPath, content, 'utf-8')
  },
};