import { MessageHandler } from '../MessageHandler';

export const onGetDirtyFileContent: MessageHandler = async ({ event, webviewPanel, document }) => {
  webviewPanel.webview.postMessage({
    type: 'dirtyFileContent',
    fileContent: new TextDecoder().decode(document.data),
  });
}