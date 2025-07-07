import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import DiagramApp from './DiagramApp';
import TableApp from './TableApp';

import './fixCodeMirrorCopyPaste';
import { dsExtensionInitialData } from './dsExtensionInitialData';
import { createSocketClient } from './createSocketClient';

const rootElement = document.getElementById('root') as HTMLElement | null;

const getCurrentFilePath = () => {
  const { documentId } = dsExtensionInitialData();
  return documentId;
};

const getEdgeIdFromPath = (path: string) => {
  const filename = path.split(/[\\/]/).pop() || '';
  return filename.replace(/\.table\.ds$/, '');
};

const App = () => {
  const filePath = getCurrentFilePath();
  const edgeId = getEdgeIdFromPath(filePath);
  const isTableFile = filePath.endsWith('.table.ds');

  /**
   * socketClient: This is the main client of ds-ext, responsible for handling diagram data.
   * Moved from DiagramApp to be shared with both DiagramApp and TableApp.
   */
  const { client: socketClient, dispose } = createSocketClient();

  useEffect(() => {
    return () => {
      dispose();
    };
  }, [dispose]);

  return (
    <React.StrictMode>
      {isTableFile ? (
        <TableApp
          edgeId={edgeId}
          client={socketClient}
        />
      ) : (
        <DiagramApp
          client={socketClient}
        />
      )}
    </React.StrictMode>
  );
};

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
} else {
  console.error('Failed to find the root element. App cannot render.');
}
