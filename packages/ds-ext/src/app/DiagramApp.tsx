import React, { useCallback } from 'react';
import { debounce, Diagram } from '@data-story/core';
import { AddNodeControl, DataStory, ExportControl, RunControl } from '@data-story/ui';
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
        controls={[<RunControl/>, <AddNodeControl/>, <ExportControl/>]}
      />
      <VsCodeToast postMessage={window.vscode.postMessage} />
    </div>
  );
}
