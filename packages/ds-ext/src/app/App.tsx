import React, { useCallback, useEffect, useState } from 'react';
import { debounce, Diagram } from '@data-story/core';
import { DataStory } from '@data-story/ui';
import { VsCodeToast } from './VsCodeToast';
import { onDrop } from './onDrop';
import { createVsCodeClient } from './createVsCodeClient';

export default function App() {
  const client = createVsCodeClient(window.vscode);
  const handleChange = useCallback(
    debounce(async (diagram: Diagram) => {
      // Construct the message payload with updated diagram data
      const updatedData = {
        type: 'updateDiagram',
        diagram: diagram,
      };

      // Send the message to VS Code extension
      window.vscode.postMessage(updatedData);
      // client?.updateDiagram?.(diagram);
    }, 100), // Debounced with 100ms delay
    []);

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
