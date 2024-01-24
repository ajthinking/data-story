import { ControlButton } from 'reactflow';
import React from 'react';
import { SaveIcon, useDataStoryControls } from '@data-story/ui';
import { Diagram } from '@data-story/core';
import { ipcRenderer } from 'electron';

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

  const diagramJSON = JSON.stringify({
    type: 'save',
    version: getCoreVersion(),
    name: key,
    diagram
  } as LocalDiagram);

  ipcRenderer.send('save-json', diagramJSON);
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
  const { getDiagram } = useDataStoryControls()

  return (
    <ControlButton
      title="Save"
      aria-label="Save"
      onClick={() => {
        const diagram = getDiagram();
        saveDiagram(LocalStorageKey, diagram);
        window.alert('Diagram saved!');
      }}>
      <SaveIcon />
    </ControlButton>
  );
}
