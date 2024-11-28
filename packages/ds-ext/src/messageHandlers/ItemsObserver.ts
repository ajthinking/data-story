import { MessageHandler } from '../MessageHandler';
import { InputObserver, type ItemsObserver, ItemValue, RequestObserverType } from '@data-story/core';

export const itemsObserver: MessageHandler = async ({ event, webviewPanel, inputObserverController }) => {
  inputObserverController.pushExecutionObserver({
    ...event,
    onReceive: (items: ItemValue[], inputObserver: InputObserver) => {
      webviewPanel.webview.postMessage({
        items,
        inputObserver,
        type: RequestObserverType.itemsObserver,
        msgId: event!.msgId,
      });
    }
  } as ItemsObserver);
};