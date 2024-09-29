import { NodeDescription, str } from '@data-story/core';

export const onDrop = (event: any, addNodeFromDescription: any) => {
  event.preventDefault();

  const path = event.dataTransfer.getData('text/plain');
  const filename = path.split('/').pop();
  const extention = filename.split('.').pop();

  if (extention !== 'json') {
    console.warn('Currently, only JSON files are supported.');
    return;
  }

  const description: NodeDescription = {
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

  addNodeFromDescription(description);
};