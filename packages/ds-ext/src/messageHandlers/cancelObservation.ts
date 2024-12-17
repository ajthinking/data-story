import { MessageHandler } from '../MessageHandler';
import { CancelObservation } from '@data-story/core';

export const cancelObservation: MessageHandler = async({ event, webviewPanel, inputObserverController }) => {
  inputObserverController.deleteExecutionObserver(event as CancelObservation);
  console.log('cancelObservation postMessage content:', event);
  webviewPanel.webview.postMessage({
    msgId: event!.msgId,
  });
};
