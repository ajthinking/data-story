import { ControlButton } from 'reactflow';
import React from 'react';
import {
  DataStoryEvents,
  DataStoryEventType,
  OpenIcon,
  SaveIcon,
  useDataStoryControls,
  useDataStoryEvent
} from '@data-story/ui';
import { Diagram } from '@data-story/core';
import { IpcResult, LocalDiagram } from './types';
import { errorToast, getCoreVersion, successToast, tryParseJSON } from './common';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const saveDiagram = async(diagram: Diagram) => {

  const diagramJSON = JSON.stringify({
    type: 'save',
    version: getCoreVersion(),
    diagram
  } as LocalDiagram, null, 2);

  const result: IpcResult = await window.electron.saveDiagram(diagramJSON);
  if (!result || result.isSuccess === false) {
    errorToast('Could not save diagram');
    console.warn('Could not save diagram', result);
    return;
  }
  successToast('Diagram saved successfully!');
};

export const loadDiagram = async(): Promise<LocalDiagram | undefined> => {
  const initDiagram: LocalDiagram = {
    type: 'load',
    version: getCoreVersion(),
    diagram: null
  }

  const file: IpcResult = await window.electron.openDiagram();
  if(file.isCancelled) return undefined;

  if (!file || file.isSuccess === false) {
    errorToast('Could not open file!');
    console.warn('Could not open file', file);
    return initDiagram;
  }

  const { valid, result } = tryParseJSON(file.data);

  if (!valid) {
    errorToast('Could not parse JSON!');
    console.warn('Could not parse JSON', result);
    return initDiagram;
  }

  const diagram = result.diagram ?? new Diagram([], []);
  initDiagram.diagram = new Diagram(diagram.nodes, diagram.links);
  return initDiagram;
}

const initToast = (event: DataStoryEventType) => {
  if (event.type === DataStoryEvents.RUN_SUCCESS) {
    successToast('Diagram executed successfully!');
  }

  if (event.type === DataStoryEvents.RUN_ERROR) {
    errorToast('Diagram execution failed!');
  }
};


export const SaveComponent = () => {
  const { getDiagram, updateDiagram } = useDataStoryControls()

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
