import { ControlButton } from 'reactflow';
import React, {useEffect, useState, useCallback} from 'react';
import {
  DataStoryEvents,
  DataStoryEventType,
  OpenIcon,
  SaveIcon,
  useDataStoryControls,
  useDataStoryEvent
} from '@data-story/ui';
import { Diagram } from '@data-story/core';
import { OpenedDiagramResult, LocalDiagram } from './types';
import { errorToast, getCoreVersion, successToast, tryParseJSON } from './common';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const saveDiagram = async(diagram: Diagram) => {
  const diagramJSON = JSON.stringify({
    type: 'save',
    version: getCoreVersion(),
    diagram
  } as LocalDiagram, null, 2);

  const result: OpenedDiagramResult = await window.electron.saveDiagram(diagramJSON);
  if (!result || result.isSuccess === false) {
    errorToast('Could not save diagram');
    console.warn('Could not save diagram', result);
    return;
  }
  successToast('Diagram saved successfully!');
};

function getLocalDiagram(file: OpenedDiagramResult):LocalDiagram | undefined {
  const localDiagram: LocalDiagram = {
    type: 'load',
    version: getCoreVersion(),
    diagram: null
  }

  if (file?.isCancelled) return undefined;

  if (!file || file.isSuccess === false) {
    errorToast('Could not open file!');
    console.warn('Could not open file', file);
    return localDiagram;
  }

  const { valid, result } = tryParseJSON(file.data);

  if (!valid) {
    errorToast('Could not parse JSON!');
    console.warn('Could not parse JSON', result);
    return localDiagram;
  }

  const diagram = result.diagram ?? new Diagram();
  localDiagram.diagram = new Diagram({
    nodes: diagram.nodes,
    links: diagram.links
  });
  return localDiagram;
}

const loadDiagram = async(): Promise<LocalDiagram | undefined> => {
  const file: OpenedDiagramResult = await window.electron.openDiagram();
  return getLocalDiagram(file);
}

const refreshDesktop = async (): Promise<LocalDiagram | undefined>  => {
  const result: OpenedDiagramResult = await window.electron.refreshDesktop();
  return getLocalDiagram(result);
};

const initToast = (event: DataStoryEventType) => {
  if (event.type === DataStoryEvents.RUN_SUCCESS) {
    successToast('Diagram executed successfully!');
  }

  if (event.type === DataStoryEvents.RUN_ERROR) {
    errorToast('Diagram execution failed!');
  }
};

export const SaveComponent = () => {
  const { getDiagram, updateDiagram } = useDataStoryControls();

  const refresh = useCallback(async () => {
    // Refresh desktop on load
    const diagramInfo = await refreshDesktop();
    if(!diagramInfo) return;

    if (updateDiagram && diagramInfo.diagram) {
      updateDiagram(diagramInfo.diagram);
    }
  }, [updateDiagram]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  useDataStoryEvent(initToast);

  const handleOpenFile = async() => {
    const diagramInfo = await loadDiagram();
    if(!diagramInfo) return;

    if (updateDiagram && diagramInfo.diagram) {
      updateDiagram(diagramInfo.diagram);
      successToast('Diagram loaded successfully!');
    }
  }

  return (
    <>
      <ControlButton
        title="Save"
        aria-label="Save"
        onClick={() => {
          const diagram = getDiagram();
          saveDiagram(diagram)
        }}>
        <SaveIcon/>
      </ControlButton>
      <ControlButton
        title="Open"
        aria-label="Open"
        onClick={handleOpenFile}>
        <OpenIcon/>
      </ControlButton>
      <ToastContainer/>
    </>
  );
}
