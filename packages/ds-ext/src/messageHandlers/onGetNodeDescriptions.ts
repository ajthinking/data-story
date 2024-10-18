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
    ...event,
    awaited: true,
    availableNodes: app.descriptions(),
  });
};