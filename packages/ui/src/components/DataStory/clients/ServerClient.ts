import { Diagram, NodeDescription } from '@data-story/core';

export interface ServerClient {
  init: () => void;
  run: (diagram: Diagram) => void;
  save: (name: string, diagram: Diagram) => {}
}

export const saveDiagramToJSON = (name: string, diagram: Diagram) => {

  return JSON.stringify({
    type: 'save',
    name,
    diagram
  });
};

export const loadDiagramFromJSON = (json: string) => {
  const { name, diagram } = JSON.parse(json);

  return {
    type: 'load',
    name,
    diagram
  };
}
