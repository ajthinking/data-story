import { ControlButton, Controls } from '@xyflow/react';
import { RunIcon } from './icons/runIcon';
import { AddNodeIcon } from './icons/addNodeIcon';
import { Diagram } from '@data-story/core';
import { StoreSchema, useStore } from './store/store';
import React, { useMemo } from 'react';

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
  setShowRunModal,
  setShowAddNodeModal,
  slotComponents
}: {
  hideToolbar?: boolean;
  setShowRunModal: (showRunModal: boolean) => void;
  setShowAddNodeModal: (showAddNodeModal: boolean) => void;
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
      onClick={() => setShowRunModal(true)}
    >
      <RunIcon/>
    </ControlButton>
    <ControlButton
      onClick={() => setShowAddNodeModal(true)}
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
