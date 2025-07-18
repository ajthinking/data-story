import React, { useEffect, useCallback } from 'react';
import { debounce, Diagram } from '@data-story/core';
import { AddNodeControl, ConfigControl, CopyAsJsonControl, DataStory, RunControl, WorkspaceApiClientImplement } from '@data-story/ui';
import { VsCodeToast } from './VsCodeToast';
import { onDrop } from './onDrop';
import { dsExtensionInitialData } from './dsExtensionInitialData';
import { createVsCodeClient } from './createVsCodeClient';

interface DiagramAppProps {
  client: WorkspaceApiClientImplement;
}

export default function DiagramApp({ client: socketClient }: DiagramAppProps) {
  /**
   * socketClient: This is the main client of ds-ext, responsible for handling diagram data.
   * vscodeClient: Primarily used to manage native operations in VSCode.
   */
  const vscodeClient = createVsCodeClient(window.vscode);

  const handleChange = useCallback(
    debounce(async (diagram: Diagram) => {
      socketClient!.updateDiagram?.(diagram, dsExtensionInitialData().documentId);
    }, 100), // Debounced with 100ms delay11
    [socketClient],
  );

  // useEffect for dispose is now handled in the parent component (index.tsx)

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
        controls={[<RunControl />, <AddNodeControl />, <CopyAsJsonControl />, <ConfigControl />]}
      >
        <VsCodeToast postMessage={window.vscode.postMessage} />
      </DataStory>
    </div>
  );
}
