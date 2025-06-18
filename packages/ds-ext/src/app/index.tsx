import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import DiagramApp from './DiagramApp';
import TableApp from './TableApp';

import './fixCodeMirrorCopyPaste';
import { dsExtensionInitialData } from './dsExtensionInitialData';

const rootElement = document.getElementById('root') as HTMLElement | null;

const getCurrentFilePath = () => {
  const { documentId } = dsExtensionInitialData();
  return documentId;
};
const getEdgeIdFromPath = (path: string) => {
  const filename = path.split(/[\\/]/).pop() || '';
  return filename.replace(/\.table\.ds$/, '');
};

const filePath = getCurrentFilePath();
const edgeId = getEdgeIdFromPath(filePath);
const isTableFile = filePath.endsWith('.table.ds');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      {isTableFile ? <TableApp edgeId={edgeId} /> : <DiagramApp />}
    </React.StrictMode>,
  );
} else {
  console.error('Failed to find the root element. App cannot render.');
}
