import glob from 'glob';
import fs from 'fs';
import { Computer, get, serializeError, str, stringifyError } from '@data-story/core';

export const JsonFileRead: Computer = {
  name: 'JsonFile.read',
  label: 'JsonFile.read',
  category: 'NodeJs',
  inputs: [],
  outputs: [
    {
      name: 'output',
      schema: {},
    },
    {
      name: 'errors',
      schema: {},
    },
  ],
  params: [
    str({
      name: 'file_path',
      label: 'File path',
      help: 'File path',
    }),
    str({
      name: 'items_path',
      label: 'Items Path',
      help: 'Items path',
    }),
  ],

  async *run({ output, params }) {
    const path = params.file_path as string
    const itemsPath = params.items_path as string

    try {
      const content = fs.readFileSync(path, 'utf-8')
      console.log('CONTENT', content)

      const data = JSON.parse(content)
      const items = get(data, itemsPath)
      output.push(items)
    } catch (error: any) {
      output.pushTo('errors', [serializeError(error)])
    }
  },
};