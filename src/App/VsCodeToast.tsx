import React from 'react';
import { DataStoryEvents, DataStoryEventType, useDataStoryEvent } from '@data-story/ui';

export function VsCodeToast() {
  useDataStoryEvent((event: DataStoryEventType) => {
    switch (event.type) {
      case DataStoryEvents.RUN_SUCCESS:
        console.log('Diagram executed successfully!');
        break;
      case DataStoryEvents.RUN_ERROR:
        console.error(event.payload);
        console.log('Diagram execution failed!');
        break;
      case DataStoryEvents.SAVE_SUCCESS:
        console.log('Diagram saved successfully!');
        break;
      case DataStoryEvents.SAVE_ERROR:
        console.error(event.payload);
        console.log('Diagram save failed!');
    }
  });

  return (
    <div>
      <h1>VS Code Toast</h1>
    </div>
  );
}