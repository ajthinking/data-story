import React, { useEffect, useCallback } from 'react';
import { debounce, Diagram } from '@data-story/core';
import { AddNodeControl, CopyAsJsonControl, DataStory, RunControl } from '@data-story/ui';
import { VsCodeToast } from './VsCodeToast';
import { onDrop } from './onDrop';
import { createVsCodeClient } from './createVsCodeClient';
import { dsExtensionInitialData } from './dsExtensionInitialData';

export default function DiagramApp() {
  const { client, dispose } = createVsCodeClient();

  const handleChange = useCallback(
    debounce(async (diagram: Diagram) => {
      client!.updateDiagram?.(diagram, dsExtensionInitialData().documentId);
    }, 100), // Debounced with 100ms delay
    [client]);

  useEffect(() => {
    return () => {
      dispose();
    };
  }, [dispose]);

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <DataStory
        diagramId={dsExtensionInitialData().documentId}
        client={client}
        hideSidebar={false}
        hideActivityBar={true}
        initSidebarKey={undefined}
        key={'abc'}
        onChange={handleChange}
        onDrop={onDrop}
        controls={[<RunControl/>, <AddNodeControl/>, <CopyAsJsonControl/>]}
      />
      <VsCodeToast postMessage={window.vscode.postMessage} />
    </div>
  );
}
