import React from 'react';
import { Application, debounce, Diagram } from '@data-story/core';
import { DataStory, DataStoryCanvas, DataStoryCanvasProvider, WorkspaceApiJSClient } from '@data-story/ui';
import { useCallback, useEffect, useState } from 'react';
import { VsCodeClient } from './VsCodeClient';

export default function App() {
  if (!window.initialData) throw new Error('No initial data found');

  const { fileUri, diagramData } = window.initialData;
  const [responseData, setResponseData] = useState(null); // To store the response from the extension
  const { nodes, links } = (() => {
    if (!diagramData) return { nodes: [], links: [] };
    return JSON.parse(diagramData);
  })();

  const diagram = new Diagram({ nodes, links });

  useEffect(() => {
    // Listen for messages from the backend
    const handleMessage = (event: any) => {
      const message = event.data;
    };

    // Attach the message listener
    window.addEventListener('message', handleMessage);

    // Cleanup the listener on unmount
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  const handleChange = useCallback(
    debounce(async (diagram: Diagram) => {
      console.log('Sending updated diagram to the VS Code extension.');

      // Construct the message payload with updated diagram data
      const updatedData = {
        type: 'updateDiagram',
        fileUri, // Include the file URI to specify the target file
        diagramData: JSON.stringify(diagram),
      };

      // Send the message to VS Code extension
      window.vscode.postMessage(updatedData);
    }, 100), // Debounced with 100ms delay
    [fileUri]
  );

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <DataStory
        client={new VsCodeClient(window.vscode)}
        onInitialize={() => { }}
        hideSidebar={false}
        hideActivityBar={true}
        initSidebarKey={undefined}
        key={'abc'}
        initDiagram={diagram}
        onChange={handleChange}
      />
    </div>
  );
}