import { MessageHandler } from '../MessageHandler';

export const getDiagram: MessageHandler = async ({ event, webviewPanel, document }) => {
  const diagramData = new TextDecoder().decode(document.data);
  const diagram = JSON.parse(diagramData);
  webviewPanel.webview.postMessage({
    ...event,
    type: 'getDiagram',
    diagram: diagram,
  });
};
