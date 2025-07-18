import { Controls } from '@xyflow/react';
import { Diagram } from '@data-story/core';
import { useStore } from '../store/store';
import React, { useMemo } from 'react';
import { DataStoryCanvasProps, StoreSchema } from '../types';

export type DataStoryControlsType = {
  getDiagram: () => Diagram;
  updateDiagram: (diagram: Diagram) => void;
  onSave?: DataStoryCanvasProps['onSave'];
  setShowAddNode: (showAddNode: boolean) => void;
  setShowConfig: (showConfig: boolean) => void;
};

const DataStoryControlsContext = React.createContext<DataStoryControlsType>(null as unknown as DataStoryControlsType);

export function useDataStoryControls() {
  const result = React.useContext(DataStoryControlsContext);
  if (!result) {
    throw new Error('useDataStoryControls must be used within a DataStoryControlsContext');
  }
  return result;
}

export function DataStoryControls({
  setShowAddNode,
  setShowConfig,
  controls = [],
  onSave,
}: {
  setShowAddNode: (showAddNode: boolean) => void;
  setShowConfig: (showConfig: boolean) => void;
  controls?: React.ReactNode[];
  onSave?: DataStoryCanvasProps['onSave'];
}) {
  const selector = (state: StoreSchema) => ({
    toDiagram: state.toDiagram,
    updateDiagram: state.updateDiagram,
  });

  const { toDiagram, updateDiagram } = useStore(selector);

  const context: DataStoryControlsType = useMemo(() => ({
    getDiagram: (): Diagram => {
      return toDiagram();
    },
    updateDiagram: (diagram: Diagram) => {
      updateDiagram(diagram);
    },
    onSave: onSave,
    setShowAddNode: setShowAddNode,
    setShowConfig: setShowConfig,
  }), [onSave, setShowAddNode, setShowConfig, toDiagram, updateDiagram]);

  return (
    <DataStoryControlsContext.Provider value={context}>
      <Controls position={'top-left'} showInteractive={false} showZoom={false} showFitView={false}>
        {(controls || []).map((component, index) => (
          <React.Fragment key={index}>
            {component}
          </React.Fragment>
        ))}
      </Controls>
    </DataStoryControlsContext.Provider>
  );
}
