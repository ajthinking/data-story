import { ComputerConfig, ComputerFactory } from '@data-story/core';

interface FileSystemFileHandle {
  getFile: () => Promise<File>;
}

export const ReadFile: ComputerConfig = {
  name: 'ReadFile',
  inputs: ['input'],
  outputs: ['path', 'content'],
  params: [
    {
      name: 'selectFile',
      label: 'select csv/json file',
      help: '',
      inputMode: {
        type: 'SelectFile',
        path: '',
        value: '',
      },
      alternativeInputModes: [],
    }
  ],

  canRun({input}) {
    return input.haveAllItemsAtInput('input');
  },

  async *run({output, params}) {

    const fileHandle = params['selectFile'] as unknown as FileSystemFileHandle;
    const file = await fileHandle?.getFile?.();
    const content = await file?.text();
    const path = (fileHandle as any).name;

    output.pushTo('content', [{
      content: content
    }]);
    output.pushTo('path', [{
      path: path
    }]);

    yield;
  },
};

export const ReadComputer = new ComputerFactory().get(ReadFile);


