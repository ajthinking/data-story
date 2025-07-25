import * as glob from 'glob';
import { promises as fs } from 'fs';
import { Computer, str } from '@data-story/core';

export const ReadFiles: Computer = {
  type: 'Computer',
  computerType: 'ReadFiles',
  label: 'ReadFiles',
  category: 'NodeJs',
  inputs: [{
    name: 'input',
    schema: {},
  }],
  outputs: [{
    name: 'files',
    schema: {
      path: 'string',
      content: 'string',
    },
  }],
  params: [
    str({
      name: 'include',
      label: 'Include',
      help: 'Glob pattern to include',
      multiline: true,
      canInterpolate: true,
      interpolate: true,
      evaluations: [],
      value: '${path}/**/*.ts',
    }),
    str({
      name: 'ignore',
      label: 'Ignore',
      help: 'Glob pattern to ignore',
      multiline: true,
      canInterpolate: true,
      interpolate: true,
      evaluations: [],
      value: '**/node_modules/**',
    }),
  ],

  async *run({ input, output }) {
    const [ incoming ] = input.pull(1)
    const include = incoming.params.include as string
    const ignore = incoming.params.ignore as string

    const paths = glob.sync(include, { ignore });

    for (const path of paths) {
      const content = await fs.readFile(path, 'utf-8')
      output.pushTo('files', [{ path, content }])
    }
  },
};
