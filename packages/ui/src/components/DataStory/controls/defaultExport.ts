import { Diagram } from '@data-story/core';

export const defaultExport = async (diagram: Diagram) => {
  try {
    const json = JSON.stringify(diagram, null, 2);

    const blob = new Blob([json], { type: 'application/json' });

    // use File System Access API to let user choose save location
    const handle = await (window as any).showSaveFilePicker({
      suggestedName: `diagram-${new Date().toISOString().slice(0,10)}.diagram.json`,
      types: [
        {
          description: 'JSON Files',
          accept: { 'application/json': ['.json'] },
        },
      ],
    });

    // Write the Blob to the user-selected file
    const writable = await handle.createWritable();
    await writable.write(blob);
    await writable.close();
  } catch (error) {
    console.error('the file save failed!', error);
    throw new Error('the file save failed');
  }
};