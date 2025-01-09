import { Diagram } from '@data-story/core';
import { MessageHandler } from '../MessageHandler';

export const getDiagram: MessageHandler = async ({ event, postMessage, document }) => {
  const diagramData = new TextDecoder().decode(document.data);
  let diagram = new Diagram();
  if(diagramData) {
    diagram = JSON.parse(diagramData);
  }

  postMessage({
    ...event,
    type: 'getDiagram',
    diagram: diagram,
  });
};
