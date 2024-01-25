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
  } as LocalDiagram, null, 2);

  window.electron.send('save-json', diagramJSON);

};

export const loadDiagram = async (): Promise<LocalDiagram> => {
  const initDiagram: LocalDiagram = {
    type: 'load',
    version: getCoreVersion(),
    diagram: null
  }

  const result = await window.electron.openFileDialog();
  const diagramInfo = JSON.parse(result);

  if(!diagramInfo && !diagramInfo.diagram){
    return initDiagram;
  }

  const diagram = diagramInfo.diagram;
  initDiagram.diagram = new Diagram(diagram.nodes, diagram.links);

  return initDiagram;
}


export const SaveComponent = () => {
  const { getDiagram, updateDiagram } = useDataStoryControls()

  const handleOpenFile = async () => {
    const diagramInfo = await loadDiagram()

    if(updateDiagram && diagramInfo.diagram){
      updateDiagram(diagramInfo.diagram);
    }
  }

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
        onClick={handleOpenFile}>
        <OpenIcon />
      </ControlButton>
    </>
  );
}
