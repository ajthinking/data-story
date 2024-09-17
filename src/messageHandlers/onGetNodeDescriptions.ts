import { Application, coreNodeProvider } from '@data-story/core';
import { MessageHandler } from '../MessageHandler';

export const onGetNodeDescriptions: MessageHandler = async ({ event, webviewPanel }) => {
  const app = new Application();
  app.register(coreNodeProvider)
  await app.boot();

  webviewPanel.webview.postMessage({
    id: event.id,
    awaited: true,
    type: 'nodeDescriptions',
    availableNodes: app.descriptions(),
  });
}