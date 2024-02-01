import { ControlButton } from 'reactflow';
import React from 'react';
import { DataStoryEvents, DataStoryEventType, SaveIcon, useDataStoryControls, useDataStoryEvent } from '@data-story/ui';
import { Diagram } from '@data-story/core';
import { Bounce, toast, ToastContainer, ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const toastConfig: ToastOptions = {
  position: 'top-right',
  style: { top: '100px' },
  autoClose: 2000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: false,
  draggable: false,
  theme: 'light',
  transition: Bounce,
}

export function errorToast(content: string): void {
  toast.error(content, toastConfig);
}

export function successToast(content: string): void {
  toast.success(content, toastConfig);
}


export interface LocalDiagram {
  type: 'load' | 'save';
  version: string;
  name: string;
  diagram: Diagram;
}

const getCoreVersion = () => {
  const { version } = require('@data-story/core/package.json');
  return version;
}
const saveDiagram = (key: string, diagram: Diagram) => {

  try {
    const diagramJSON = JSON.stringify({
      type: 'save',
      version: getCoreVersion(),
      name: key,
      diagram
    } as LocalDiagram);

    localStorage?.setItem(key, diagramJSON);
    successToast('Diagram saved successfully!');
  } catch(e) {
    errorToast('Could not save diagram!');
    console.error(e);
  }
};

const initToast = (event: DataStoryEventType) => {
  if (event.type === DataStoryEvents.RUN_SUCCESS) {
    successToast('Diagram executed successfully!');
  }

  if (event.type === DataStoryEvents.RUN_ERROR) {
    errorToast('Diagram execution failed!');
  }
};


export const loadDiagram = (key: string): LocalDiagram => {
  const initDiagram: LocalDiagram = {
    type: 'load',
    version: getCoreVersion(),
    name: key,
    diagram: null
  }

  if (typeof window === 'undefined' || !localStorage?.getItem(key)) {
    return initDiagram;
  }

  const json = localStorage?.getItem(key);
  const { name, diagram } = JSON.parse(json);

  initDiagram.diagram = new Diagram(diagram.nodes, diagram.links);
  initDiagram.name = name;

  return initDiagram;
}

export const LocalStorageKey = 'data-story-diagram';

export const SaveComponent = () => {
  const { getDiagram } = useDataStoryControls();
  useDataStoryEvent(initToast);

  return (
    <>
      <ControlButton
        title="Save"
        aria-label="Save"
        onClick={() => {
          const diagram = getDiagram();
          saveDiagram(LocalStorageKey, diagram);
        }}>
        <SaveIcon/>
      </ControlButton>
      <ToastContainer/>
    </>
  );
}
