import React, { useCallback, useEffect, useState } from 'react';
import { debounce, Diagram } from '@data-story/core';
import { DataStory } from '@data-story/ui';
import { VsCodeToast } from './VsCodeToast';
import { onDrop } from './onDrop';
import { createVsCodeClient } from './createVsCodeClient';

export const fileUri = window.initialData.fileUri;

export default function App() {
  const [diagram, setDiagram] = useState<Diagram | undefined>();

  useEffect(() => {
    if (window.vscode) {
      window.vscode.postMessage({
        type: 'getDirtyFileContent',
      });
    }

    const handleMessage = (event: any) => {
      const message = event.data;

      if (message.type === 'dirtyFileContent') {
        setDiagram(
          message.fileContent
            ? new Diagram(JSON.parse(message.fileContent))
            : new Diagram()
        );
      }
    };

    window.addEventListener('message', handleMessage);

    // Cleanup the listener on unmount
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

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
  // Only render DataStory if diagramData is available
  if (!diagram) {
    return <div>Loading diagram...</div>;
  }

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <DataStory
        client={client}
        hideSidebar={false}
        hideActivityBar={true}
        initSidebarKey={undefined}
        key={'abc'}
        initDiagram={diagram}
        onChange={handleChange}
        onDrop={onDrop}
      />
      <VsCodeToast postMessage={window.vscode.postMessage} />
    </div>
  );
}
