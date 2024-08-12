import { ControlButton, Controls } from '@xyflow/react';
import { RunIcon } from './icons/runIcon';
import { AddNodeIcon } from './icons/addNodeIcon';
import { Diagram } from '@data-story/core';
import { useStore } from './store/store';
import React, { useMemo } from 'react';
import { StoreSchema } from './types';

export type DataStoryControlsType = {
  getDiagram: () => Diagram;
  updateDiagram: (diagram: Diagram) => void;
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
  hideToolbar = false,
  setShowRunForm,
  setShowAddNodeForm,
  slotComponents
}: {
  hideToolbar?: boolean;
  setShowRunForm: (showRunModal: string) => void;
  setShowAddNodeForm: (showAddNodeModal: string) => void;
  slotComponents?: React.ReactNode[];
}) {
  const selector = (state: StoreSchema) => ({
    toDiagram: state.toDiagram,
    updateDiagram: state.updateDiagram,
  });

  const { toDiagram, updateDiagram } = useStore(selector);

  const context: DataStoryControlsType = useMemo(() => ({
    getDiagram: () => {
      return toDiagram();
    },
    updateDiagram: (diagram: Diagram) => {
      updateDiagram(diagram);
    }
  }), [updateDiagram, toDiagram]);

  if (hideToolbar) return null;

  return <Controls position={'top-left'} showInteractive={false} showZoom={false} showFitView={false}>
    <ControlButton
      title="Run"
      aria-label="Run"
      onClick={() => setShowRunForm('run')}
    >
      <RunIcon/>
    </ControlButton>
    <ControlButton
      onClick={() => setShowAddNodeForm('addNode')}
      title="Add Node"
      data-cy="add-node-button"
      aria-label="Add Node"
    >
      <AddNodeIcon/>
    </ControlButton>

    <DataStoryControlsContext.Provider value={context}>
      {(slotComponents || []).map((component, index) => (
        <React.Fragment key={index}>
          {component}
        </React.Fragment>
      ))}
    </DataStoryControlsContext.Provider>
  </Controls>;
}
