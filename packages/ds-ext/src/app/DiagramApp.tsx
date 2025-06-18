import React, { useEffect, useCallback } from 'react';
import { debounce, Diagram } from '@data-story/core';
import { AddNodeControl, CopyAsJsonControl, DataStory, RunControl } from '@data-story/ui';
import { VsCodeToast } from './VsCodeToast';
import { onDrop } from './onDrop';
import { createSocketClient } from './createSocketClient';
import { dsExtensionInitialData } from './dsExtensionInitialData';
import { createVsCodeClient } from './createVsCodeClient';

export default function DiagramApp() {
  /**
   * socketClient: This is the main client of ds-ext, responsible for handling diagram data.
   * vscodeClient: Primarily used to manage native operations in VSCode.
   */
  const { client: socketClient, dispose } = createSocketClient();
  const vscodeClient = createVsCodeClient(window.vscode);

  const handleChange = useCallback(
    debounce(async (diagram: Diagram) => {
      socketClient!.updateDiagram?.(diagram, dsExtensionInitialData().documentId);
    }, 100), // Debounced with 100ms delay11
    [socketClient]);

  useEffect(() => {
    return () => {
      dispose();
    };
  }, [dispose]);

  function handleEdgeDoubleClick(edgeId: string): void {
    vscodeClient.onEdgeDoubleClick(edgeId);
  }

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <DataStory
        diagramId={dsExtensionInitialData().documentId}
        client={socketClient}
        hideSidebar={false}
        hideActivityBar={true}
        initSidebarKey={undefined}
        key={'abc'}
        onChange={handleChange}
        onEdgeDoubleClick={handleEdgeDoubleClick}
        onDrop={onDrop}
        controls={[<RunControl />, <AddNodeControl />, <CopyAsJsonControl />]}
      />
      <VsCodeToast postMessage={window.vscode.postMessage} />
    </div>
  );
}
