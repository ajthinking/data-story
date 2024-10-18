import React, { useCallback, useEffect, useState } from 'react';
import { debounce, Diagram } from '@data-story/core';
import { DataStory } from '@data-story/ui';
import { VsCodeToast } from './VsCodeToast';
import { onDrop } from './onDrop';
import { createVsCodeClient } from './createVsCodeClient';

export const fileUri = window.initialData.fileUri;

export default function App() {
  const handleChange = useCallback(
    debounce(async (diagram: Diagram) => {
      // Construct the message payload with updated diagram data
      const updatedData = {
        type: 'updateDiagram',
        fileUri, // Include the file URI to specify the target file
        diagram: JSON.stringify(diagram),
      };

      // Send the message to VS Code extension
      window.vscode.postMessage(updatedData);
    }, 100), // Debounced with 100ms delay
    [fileUri]
  );

  const client = createVsCodeClient(window.vscode);

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <DataStory
        client={client}
        hideSidebar={false}
        hideActivityBar={true}
        initSidebarKey={undefined}
        key={'abc'}
        onChange={handleChange}
        onDrop={onDrop}
      />
      <VsCodeToast postMessage={window.vscode.postMessage} />
    </div>
  );
}
