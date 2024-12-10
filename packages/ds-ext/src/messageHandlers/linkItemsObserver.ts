import { MessageHandler } from '../MessageHandler';
import { InputObserver, type LinkItemsObserver, ItemValue, RequestObserverType } from '@data-story/core';

export const linkItemsObserver: MessageHandler = async ({ event, webviewPanel, inputObserverController }) => {
  inputObserverController.addlinkItemsObserver({
    ...event,
    onReceive: (items: ItemValue[], inputObserver: InputObserver) => {
      webviewPanel.webview.postMessage({
        items,
        inputObserver,
        type: RequestObserverType.linkItemsObserver,
        msgId: event!.msgId,
      });
    }
  } as LinkItemsObserver);
};