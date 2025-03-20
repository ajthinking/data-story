import { NodeDescription, str } from '@data-story/core';

export const onDrop = (event: any, addNodeFromDescription: any) => {
  event.preventDefault();

  if(isDropFromOs(event)) return onDropFromOs(event, addNodeFromDescription);

  if(isDropFromExplorer(event)) return onDropFromExplorer(event, addNodeFromDescription);
};

export const isDropFromOs = (event: any) => {
  return event.dataTransfer.files.length;
};

export const isDropFromExplorer = (event: any) => {
  return event.dataTransfer.getData('text/plain');
};

export const onDropFromOs = (event: any, addNodeFromDescription: any) => {
  const file = event.dataTransfer.files[0];
  const path = file.path;
  const filename = path.split('/').pop();
  const extention = filename.split('.').pop();

  if (extention === 'json') {
    const description = createJsonFileReadDescription(filename, path);
    addNodeFromDescription(description);

    return;
  }

  if (extention === 'csv') {
    const description = createCsvFileReadDescription(filename, path);
    addNodeFromDescription(description);

    return;
  }

  console.warn({
    message: 'Currently, only JSON and CSV files are supported.',
    path,
    filename,
    extention,
  });
};

export const onDropFromExplorer = (event: any, addNodeFromDescription: any) => {
  // DROP FROM EXPLORER
  const path = event.dataTransfer.getData('text/plain');
  const filename = path.split('/').pop();
  const extention = filename.split('.').pop();

  if (extention === 'json') {
    const description = createJsonFileReadDescription(filename, path);
    addNodeFromDescription(description);
    return;
  }

  if (extention === 'csv') {
    const description = createCsvFileReadDescription(filename, path);
    addNodeFromDescription(description);
    return;
  }

  console.warn({
    message: 'Currently, only JSON and CSV files are supported.',
    path,
    filename,
    extention,
  });
};

export const createJsonFileReadDescription = (filename: string, path: string): NodeDescription => {
  return {
    name: 'JsonFile.read',
    label: filename,
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
        input: path,
      }),
      str({
        name: 'items_path',
        label: 'Items Path',
        help: 'Items path',
      }),
    ],
  };
};

export const createCsvFileReadDescription = (filename: string, path: string): NodeDescription => {
  return {
    name: 'CsvFile.read',
    label: filename,
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
        label: 'File path (supports glob patterns)',
        help: 'File path, e.g., **/*.csv',
        input: path,
      }),
      str({
        name: 'delimiter',
        label: 'Delimiter',
        help: 'CSV delimiter character (default: ,)',
        input: ',',
      }),
      str({
        name: 'batch_size',
        label: 'Batch size',
        help: 'Number of records to yield in each batch (default: 1000)',
        input: '1000',
      }),
    ],
  };
};