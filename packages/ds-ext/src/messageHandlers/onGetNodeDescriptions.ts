import { Application, coreNodeProvider } from '@data-story/core';
import { MessageHandler } from '../MessageHandler';
import { nodeJsProvider } from '@data-story/nodejs';

export const onGetNodeDescriptions: MessageHandler = async ({ event, webviewPanel }) => {
  const app = new Application();
  app.register([
    coreNodeProvider,
    nodeJsProvider,
  ]);
  await app.boot();

  webviewPanel.webview.postMessage({
    id: event.id,
    awaited: true,
    type: 'nodeDescriptions',
    availableNodes: app.descriptions(),
  });
};