import { ControlButton } from '@xyflow/react';
import { ImportIcon } from '../icons/importIcon';
import { useDataStoryControls } from './DataStoryControls';
import { eventManager } from '../events/eventManager';
import { DataStoryEvents } from '../events/dataStoryEventType';
import { Diagram } from '@data-story/core';

const defaultImport = (): Promise<Diagram> => {
  return new Promise((resolve, reject) => {
    // create an input element
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.diagram.json,.ds';
    input.style.display = 'none';

    // when the user selects a file
    input.onchange = (event: Event) => {
      const files = (event.target as HTMLInputElement).files;
      if (files && files.length > 0) {
        const file = files[0];
        const reader = new FileReader();

        // read the file content
        reader.onload = (e: ProgressEvent<FileReader>) => {
          if (e.target && e.target.result) {
            try {
              const diagram = JSON.parse(e.target.result as string);
              resolve(diagram);
            } catch (error) {
              reject(new Error('Failed to parse the file as JSON.'));
            }
          } else {
            reject(new Error('File reading failed.'));
          }
        };

        reader.onerror = () => {
          reject(new Error('Error occurred while reading the file.'));
        };

        // start reading the file
        reader.readAsText(file);
      } else {
        // no file selected
        reject(new Error('No file selected.'));
      }

      // clean up the DOM
      document.body.removeChild(input);
    };

    // add the input element to the DOM and trigger the file selection dialog
    document.body.appendChild(input);
    input.click();
  });
};

export const ImportControl = () => {
  const { updateDiagram } = useDataStoryControls();

  const handleImport = async () => {
    try {
      const diagram = await defaultImport();
      updateDiagram(diagram);
      eventManager.emit({ type: DataStoryEvents.IMPORT_SUCCESS });
    } catch (error: any) {
      eventManager.emit({
        type: DataStoryEvents.IMPORT_ERROR,
        payload: { message: error.message },
      });
    }
  };

  return (
    <ControlButton
      title="Import"
      aria-label="import"
      onClick={handleImport}
    >
      <ImportIcon />
    </ControlButton>
  );
};

ImportControl.defaultProps = {
  ariaLabel: 'import',
};
