import { Application, Diagram } from '@data-story/core';
import { DataStory, DataStoryCanvas, DataStoryCanvasProvider, WorkspaceApiJSClient } from '@data-story/ui';
import { useEffect, useState } from 'react';

declare global {
  interface Window {
    initialData: any;
    vscode: any
  }
}

export default function MyComponent() {
  if(!window.initialData) throw new Error('No initial data found');

  const { fileUri, diagramData } = window.initialData;
  const [responseData, setResponseData] = useState(null); // To store the response from the extension
  const { nodes, links } = JSON.parse(diagramData);
  const diagram = new Diagram({ nodes, links });

  console.log({ fileUri, diagramData });

  useEffect(() => {
    // Send a 'ready' message to the backend
    window.vscode.postMessage({ type: 'ready' });

    // Listen for messages from the backend
    const handleMessage = (event: any) => {
      const message = event.data;
      if (message.type === 'init') {
        console.log('Received response from extension:', message.data);
        setResponseData(message.data);  // Store the response data in state
      }
    };

    // Attach the message listener
    window.addEventListener('message', handleMessage);

    // Cleanup the listener on unmount
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <DataStoryCanvasProvider>
        <DataStoryCanvas
          client={new WorkspaceApiJSClient(new Application())}
          onInitialize={()=>{}}
          hideSidebar={true}
          hideActivityBar={true}
          initSidebarKey={undefined}
          onSave={()=> new Promise(
            () => console.log('Save')
          )}
          key={'abc'}
          initDiagram={diagram}
          ref={undefined}
          setSidebarKey={() => {}}
          sidebarKey={undefined}
          selectedNode={undefined}
          selectedNodeData={undefined}
          onNodeSelected={() => {}}          
        />
      </DataStoryCanvasProvider>
    </div>
  );
}


// client={new WorkspaceApiJSClient(new Application())}
// hideActivityBar={true}
// hideStatusBar={true}