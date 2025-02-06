import { Diagram } from '@data-story/core';

export const defaultExport = (diagram: Diagram) =>{
  const json = JSON.stringify(diagram, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `diagram-${new Date().toISOString().slice(0,10)}.diagram.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}