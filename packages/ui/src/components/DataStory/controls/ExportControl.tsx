import { ControlButton } from '@xyflow/react';
import { ExportIcon } from '../icons/export';
import { useDataStoryControls } from './DataStoryControls';
import { eventManager } from '../events/eventManager';
import { DataStoryEvents } from '../events/dataStoryEventType';
import { Diagram } from '@data-story/core';

const defaultExport = async (diagram: Diagram) => {
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

export const ExportControl = () => {
  const { getDiagram } = useDataStoryControls();

  const handleExport = async () => {
    try {
      const diagram = getDiagram();
      await defaultExport(diagram);
      eventManager.emit({ type: DataStoryEvents.EXPORT_SUCCESS });
    } catch(error: any) {
      eventManager.emit({
        type: DataStoryEvents.EXPORT_ERROR,
        payload: { message: error.message },
      });
    }
  };

  return (
    <ControlButton
      title="Export"
      aria-label="export"
      onClick={handleExport}
    >
      <ExportIcon />
    </ControlButton>
  );
};