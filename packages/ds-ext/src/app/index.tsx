import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import DiagramApp from './DiagramApp';
import TableApp from './TableApp';

import './fixCodeMirrorCopyPaste';

// Declare global window property for TypeScript
interface Window {
  initialData?: {
    filePath?: string;
  };
}

// TypeScript null-check or assertion for the root element
const rootElement = document.getElementById('root') as HTMLElement | null;

// 1. 获取当前文件的文件路径，包含名称。
// 2. 判断文件是否以 .table.ds 结尾。
// 3. 如果是，则打开 TableApp。
// 4. 如果不是，则打开 DiagramApp。

// Get the current file path from the URL or from a global variable
// In VS Code extension webviews, this information might be passed via state
const getCurrentFilePath = () => {
  // This is a placeholder - in a real VS Code extension, you would get this from the webview state
  // or from a message passed from the extension
  if (window.initialData && window.initialData.filePath) {
    return window.initialData.filePath;
  }

  // Fallback: try to get from URL search params
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('filePath') || '';
};

const filePath = getCurrentFilePath();
const isTableFile = filePath.endsWith('.table.ds');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      {isTableFile ? <TableApp /> : <DiagramApp />}
    </React.StrictMode>,
  );
} else {
  console.error('Failed to find the root element. App cannot render.');
}
