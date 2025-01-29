import { NodeDescription, str } from '@data-story/core';

export const onDrop = (event: any, addNodeFromDescription: any) => {
  event.preventDefault();

  if(isDropFromOs(event)) return onDropFromOs(
    event,
    addNodeFromDescription,
  );

  if(isDropFromExplorer(event)) return onDropFromExplorer(
    event,
    addNodeFromDescription,
  );
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

  if (extention !== 'json') {
    console.warn({
      message: 'Currently, only JSON files are supported.',
      path,
      filename,
      extention,
    });

    return;
  }

  const description = createJsonFileReadDescription(filename, path);
  addNodeFromDescription(description);
};

export const onDropFromExplorer = (event: any, addNodeFromDescription: any) => {
  // DROP FROM EXPLORER
  const path = event.dataTransfer.getData('text/plain');
  const filename = path.split('/').pop();
  const extention = filename.split('.').pop();

  if (extention !== 'json') {
    console.warn({
      message: 'Currently, only JSON files are supported.',
      path,
      filename,
      extention,
    });

    return;
  }

  const description = createJsonFileReadDescription(filename, path);
  addNodeFromDescription(description);
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
        value: path,
      }),
      str({
        name: 'items_path',
        label: 'Items Path',
        help: 'Items path',
      }),
    ],
  };
};