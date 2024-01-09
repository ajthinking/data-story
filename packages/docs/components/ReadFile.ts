import { ComputerConfig, ComputerFactory } from '@data-story/core';

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

  async *run({input, output, params}) {

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

interface FileSystemFileHandle {
  getFile: () => Promise<File>;
}

export const readFileFn = async() => {
  const handleFileRead = async(fileHandle: FileSystemFileHandle) => {
    const file = await fileHandle.getFile();
    return await file.text();
  };

  try {
    // show file picker
    const [fileHandle] = await window.showOpenFilePicker!({
      types: [
        {
          description: 'Text Files',
          accept: {
            'text/csv': ['.csv'],
            'application/json': ['.json'],
          },
        },
      ],
    });

    return await handleFileRead(fileHandle as unknown as FileSystemFileHandle);
  } catch(error) {
    console.error('File selection was cancelled or failed', error);
  }
};



