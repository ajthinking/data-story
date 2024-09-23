import React from 'react';
import { DataStoryEvents, DataStoryEventType, useDataStoryEvent } from '@data-story/ui';

// VSCode 提供的 vscode.window.showInformationMessage、vscode.window.showWarningMessage 或 vscode.window.showErrorMessage 
export function VsCodeToast({postMessage}: {postMessage: (message: {
  type: string;
  payload?: any;
  [key: string]: any;
}) => void}) {

  useDataStoryEvent((event: DataStoryEventType) => {
    switch (event.type) {
      case DataStoryEvents.RUN_SUCCESS:
        console.log('Diagram executed successfully!');
        postMessage({type: 'toast', payload: 'Diagram executed successfully!'});
        // window.vscode.window.showInformationMessage('Diagram executed successfully!');
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