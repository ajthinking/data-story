import React, { useCallback } from 'react';
import { debounce, Diagram } from '@data-story/core';
import { AddNodeControl, CopyAsJsonControl, DataStory, RunControl } from '@data-story/ui';
import { VsCodeToast } from './VsCodeToast';
import { onDrop } from './onDrop';
import { createVsCodeClient } from './createVsCodeClient';

export default function DiagramApp() {
  const client = createVsCodeClient(window.vscode);

  const handleChange = useCallback(
    debounce(async (diagram: Diagram) => {
      client!.updateDiagram?.(diagram);
    }, 100), // Debounced with 100ms delay
    [client]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    // Stop the event from bubbling up to the VSCode iframe event handler
    e.stopPropagation();
  }, []);

  return (
    <div onKeyDown={handleKeyDown}
      style={{ width: '100%', height: '100vh' }}>
      <DataStory
        client={client}
        hideSidebar={false}
        hideActivityBar={true}
        initSidebarKey={undefined}
        key={'abc'}
        onChange={handleChange}
        onDrop={onDrop}
        controls={[<RunControl />, <AddNodeControl />, <CopyAsJsonControl />]}
      />
      <VsCodeToast postMessage={window.vscode.postMessage} />
    </div>
  );
}
