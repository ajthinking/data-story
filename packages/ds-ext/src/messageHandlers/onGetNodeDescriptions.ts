import { MessageHandler } from '../MessageHandler';
import { createAndBootApp } from '../app/createAndBootApp';

export const onGetNodeDescriptions: MessageHandler = async ({ event, webviewPanel }) => {
  const app = await createAndBootApp();

  webviewPanel.webview.postMessage({
    ...event,
    awaited: true,
    availableNodes: app.descriptions(),
  });
};