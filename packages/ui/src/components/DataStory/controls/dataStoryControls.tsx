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
import { defaultImport } from './defaultImport';
import { defaultExport } from './defaultExport';
import { eventManager } from '../events/eventManager';
import { DataStoryEvents } from '../events/dataStoryEventType';

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

  const handleImport = async () => {
    try {
      const diagram = await defaultImport();
      updateDiagram(diagram);
      eventManager.emit({
        type: DataStoryEvents.IMPORT_SUCCESS,
      });
    } catch (error: any & { message: string }) {
      eventManager.emit({
        type: DataStoryEvents.IMPORT_ERROR,
        payload: {
          message: error.message,
        },
      });
    }
  }

  const handleExport = async() => {
    try {
      const diagram = toDiagram();
      await defaultExport(diagram);
      eventManager.emit({
        type: DataStoryEvents.EXPORT_SUCCESS,
      });
    } catch(error: any & { message: string }) {
      eventManager.emit({
        type: DataStoryEvents.EXPORT_ERROR,
        payload: {
          message: error.message,
        },
      });
    }
  }

  const handleSave = useCallback(() => {
    onSave?.(toDiagram());
  }, [onSave]);

  if (hideControls === true) return null;

  return <Controls position={'top-left'} showInteractive={false} showZoom={false} showFitView={false}>
    {[<ControlButton
      title="Run"
      aria-label="run"
      key="run"
      onClick={() => {
        // If no parameters are present, run the diagram immediately
        onRun();

        // // TODO
        // // If parameters is present, do show the run modal
        // setShowRun(true)
      }}
    >
      <RunIcon/>
    </ControlButton>,
    <ControlButton
      onClick={() => setShowAddNode(true)}
      title="Add Node"
      data-cy="add-node-button"
      key="addNode"
      aria-label="addNode"
    >
      <AddNodeIcon/>
    </ControlButton>,
    <ControlButton
      title="Save"
      aria-label="save"
      key="save"
      onClick={handleSave}>
      <SaveIcon/>
    </ControlButton>,
    <ControlButton
      title="Export"
      aria-label="export"
      key="export"
      onClick={handleExport}
    >
      <ExportIcon />
    </ControlButton>,
    <ControlButton
      title="Import"
      aria-label="import"
      key="import"
      onClick={handleImport}
    >
      <ImportIcon />
    </ControlButton>,
    ].filter((ControlButton) => {
      if (Array.isArray(hideControls)) {
        return !hideControls.includes(ControlButton.props['aria-label']);
      }
      return true;
    })}

    <DataStoryControlsContext.Provider value={context}>
      {(slotComponents || []).map((component, index) => (
        <React.Fragment key={index}>
          {component}
        </React.Fragment>
      ))}
    </DataStoryControlsContext.Provider>
  </Controls>;
}