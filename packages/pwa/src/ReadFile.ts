import { ComputerConfig, ComputerFactory } from "@data-story/core";

export const ReadFile: ComputerConfig = {
  name: 'ReadFile',
  inputs: [],
  outputs: [],
  params: [
    {
      name: 'path',
      label: 'Path',
      help: 'Path to file',
      inputMode: {
        type: 'Stringable',
        multiline: false,
        canInterpolate: false,
        interpolate: false,
        evaluations: [],
        casts: [],
        value: '',
      },
      alternativeInputModes: [],
    }
  ],

  // eslint-disable-next-line no-empty-pattern
  async *run({}) {},
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
    const [fileHandle] = await window.showOpenFilePicker({
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



