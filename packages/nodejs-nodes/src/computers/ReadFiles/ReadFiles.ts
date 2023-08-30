import glob from 'glob';
import { string } from '@data-story/core/dist/ParamBuilder';
import { ComputerConfig } from '@data-story/core/dist/types/ComputerConfig';
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
  params: {
    include: string('include').value('${path}/**/*.ts').get(),
    ignore: string('ignore').value('**/node_modules/**').get(),
  },

  async *run({ input, output }) {
    const [{ params: { include, ignore } }] = input.pull(1)

    const paths = glob.sync(include, { ignore });

    for (const path of paths) {
      const content = await fs.readFile(path, 'utf-8')
      output.pushTo('files', [{ path, content }])
    }
  },
};