import { ControlButton } from 'reactflow';
import React from 'react';
import { SaveIcon, useDataStoryControls } from '@data-story/ui';
import { Diagram } from '@data-story/core';

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
  });

  localStorage?.setItem(key, diagramJSON);
};

export const loadDiagram = (key: string) => {
  if (typeof window === 'undefined' || !localStorage?.getItem(key)) {
    return {
      type: 'load',
      version: getCoreVersion(),
      name: key,
      diagram: null
    };
  }

  const json = localStorage?.getItem(key);
  const { name, diagram } = JSON.parse(json);

  return {
    type: 'load',
    name,
    diagram
  };
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
