import { MessageHandler } from '../MessageHandler';

export const onReady: MessageHandler = ({ webviewPanel }) => {
  webviewPanel.webview.postMessage({
    type: 'init',
    data: {
      message: 'Hello from the extension!',
      additionalInfo: 'This is the initial data from the extension.'
    }
  });
}