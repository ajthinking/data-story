import { Controls } from '@xyflow/react';
import { Diagram } from '@data-story/core';
import { useStore } from '../store/store';
import React, { useMemo } from 'react';
import { DataStoryCanvasProps, DataStoryProps, StoreSchema } from '../types';
import { RunControl } from './RunControl';
import { AddNodeControl } from './AddNodeControl';
import { SaveControl } from './SaveControl';
import { ExportControl } from './ExportControl';
import { ImportControl } from './ImportControl';

export type DataStoryControlsType = {
  getDiagram: () => Diagram;
  updateDiagram: (diagram: Diagram) => void;
  onSave?: DataStoryCanvasProps['onSave'];
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
  hideControls = false,
  setShowRun,
  setShowAddNode,
  slotComponents,
  onSave,
}: {
  hideControls?: DataStoryProps['hideControls'];
  setShowRun: (showRun: boolean) => void;
  setShowAddNode: (showAddNode: boolean) => void;
  slotComponents?: React.ReactNode[];
  onSave?: DataStoryCanvasProps['onSave'];
}) {
  const selector = (state: StoreSchema) => ({
    toDiagram: state.toDiagram,
    updateDiagram: state.updateDiagram,
    onRun: state.onRun,
  });

  const { toDiagram, updateDiagram, onRun } = useStore(selector);

  const context: DataStoryControlsType = useMemo(() => ({
    getDiagram: () => {
      return toDiagram();
    },
    updateDiagram: (diagram: Diagram) => {
      updateDiagram(diagram);
    },
    onSave: onSave,
  }), [updateDiagram, toDiagram]);

  if (hideControls === true) return null;

  return (

    <DataStoryControlsContext.Provider value={context}>
      <Controls position={'top-left'} showInteractive={false} showZoom={false} showFitView={false}>
        {[
          RunControl,
          AddNodeControl,
          SaveControl,
          ExportControl,
          ImportControl,
        ].filter((Component) => {
          if (Array.isArray(hideControls)) {
            return !hideControls.includes(Component.defaultProps?.ariaLabel);
          }
          return true;
        }).map((Component, index) => (
          <Component key={index} setShowAddNode={setShowAddNode}/>
        ))}

        {(slotComponents || []).map((component, index) => (
          <React.Fragment key={index}>
            {component}
          </React.Fragment>
        ))}
      </Controls>
    </DataStoryControlsContext.Provider>
  );
}
