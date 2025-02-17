import { ControlButton, Controls } from '@xyflow/react';
import { RunIcon } from '../icons/runIcon';
import { AddNodeIcon } from '../icons/addNodeIcon';
import { Diagram } from '@data-story/core';
import { useStore } from '../store/store';
import React, { useCallback, useMemo } from 'react';
import { DataStoryCanvasProps, DataStoryProps, StoreSchema } from '../types';
import { SaveIcon } from '../icons/saveIcon';
import { ExportIcon } from '../icons/export';
import { ImportIcon } from '../icons/importIcon';
import { eventManager } from '../events/eventManager';
import { DataStoryEvents } from '../events/dataStoryEventType';
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
      <Controls>
        {[
          RunControl,
          AddNodeControl,
          SaveControl,
          ExportControl,
          ImportControl,
        ].filter((Component) => {
          if (Array.isArray(hideControls)) {
            // @ts-ignore todo
            return !hideControls.includes(Component.defaultProps?.ariaLabel);
          }
          return true;
        }).map((Component, index) => (
          <Component key={index} setShowAddNode={setShowAddNode} />
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
