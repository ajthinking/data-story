import { ControlButton } from 'reactflow';
import React from 'react';
import { SaveIcon, useDataStoryControls, OpenIcon } from '@data-story/ui';
import { Diagram } from '@data-story/core';
import { LocalDiagram } from './types';
import { getCoreVersion } from './common';

const saveDiagram = (diagram: Diagram) => {

  const diagramJSON = JSON.stringify({
    type: 'save',
    version: getCoreVersion(),
    diagram
  } as LocalDiagram);

  window.electron.send('save-json', diagramJSON);

};

export const loadDiagram = async (): Promise<LocalDiagram> => {
  const initDiagram: LocalDiagram = {
    type: 'load',
    version: getCoreVersion(),
    diagram: null
  }

  const result = await window.electron.openFileDialog();
  console.log('result', result);

  if(!result && !result.diagram){
    return initDiagram;
  }

  const diagram = JSON.parse(result.diagram);

  initDiagram.diagram = new Diagram(diagram.nodes, diagram.links);
  console.log('initDiagram', initDiagram);

  return initDiagram;
}


export const SaveComponent = () => {
  const { getDiagram } = useDataStoryControls()

  return (
    <>
      <ControlButton
        title="Save"
        aria-label="Save"
        onClick={() => {
          const diagram = getDiagram();
          saveDiagram(diagram);
        }}>
        <SaveIcon/>
      </ControlButton>
      <ControlButton
        title="Open"
        aria-label="Open"
        onClick={() => {
          loadDiagram()
        }}>
        <OpenIcon />
      </ControlButton>
    </>
  );
}
