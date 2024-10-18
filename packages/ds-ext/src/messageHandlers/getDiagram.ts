import { MessageHandler } from '../MessageHandler';

export const getDiagram: MessageHandler = async ({ event, webviewPanel, document }) => {
  const diagram = new TextDecoder().decode(document.data);
  webviewPanel.webview.postMessage({
    ...event,
    type: 'getDiagram',
    diagram: JSON.parse(diagram),
  });
};
