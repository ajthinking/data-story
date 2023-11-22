import glob from 'glob';
import { ComputerConfig } from '../../../types/ComputerConfig';
import { promises as fs } from 'fs';

export const ReadFiles: ComputerConfig = {
  name: 'ReadFiles',
  inputs: [{
    name: 'input',
    schema: {}
  }],
  outputs: [{
    name: 'files',
    schema: {
      path: 'string',
      content: 'string',
    }
  }],
  params: [
    {
      name: 'include',
      label: 'Include',
      help: 'Glob pattern to include',
      inputMode: {
        type: 'Stringable',
        multiline: true,
        canInterpolate: true,
        interpolate: true,
        evaluations: [],
        casts: [],
        value: '${path}/**/*.ts',
      },
      alternativeInputModes: [],
    },
    {
      name: 'ignore',
      label: 'Ignore',
      help: 'Glob pattern to ignore',
      inputMode: {
        type: 'Stringable',
        multiline: true,
        canInterpolate: true,
        interpolate: true,
        evaluations: [],
        casts: [],
        value: '**/node_modules/**',
      },
      alternativeInputModes: [],
    },        
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