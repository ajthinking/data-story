import { Application, debounce, Diagram } from '@data-story/core';
import { DataStory, DataStoryCanvas, DataStoryCanvasProvider, WorkspaceApiJSClient } from '@data-story/ui';
import { useCallback, useEffect, useState } from 'react';
import { VsCodeClient } from './VsCodeClient';

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

  useEffect(() => {
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
        <DataStory
          client={new VsCodeClient(window.vscode)}
          onInitialize={()=>{}}
          hideSidebar={false}
          hideActivityBar={true}
          initSidebarKey={undefined}
          key={'abc'}
          initDiagram={diagram}
          onChange={useCallback(
            debounce(async (diagram: Diagram) => {
              console.log('TODO: send signal to *update* diagram! Note not *save* - we are only to persist the unsaved changes at this point.');
              console.warn('TODO: this does not react to changes of node configurations :/')
            }, 100),
            []
          )}
        />

      {/* <DataStoryCanvasProvider>
        <DataStoryCanvas
          client={new VsCodeClient()}
          onInitialize={()=>{}}
          hideSidebar={false}
          hideActivityBar={true}
          initSidebarKey={undefined}
          onSave={()=> new Promise(
            () => console.log('Save')
          )}
          key={'abc'}
          initDiagram={diagram}
          ref={undefined}
          setSidebarKey={(e) => {
            console.log(e)
          }}
          sidebarKey={undefined}
          selectedNode={undefined}
          selectedNodeData={undefined}
          onNodeSelected={() => {}}          
        />
      </DataStoryCanvasProvider> */}
    </div>
  );
}


// client={new WorkspaceApiJSClient(new Application())}
// hideActivityBar={true}
// hideStatusBar={true}