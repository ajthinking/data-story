import { MessageHandler } from '../MessageHandler';
import {
  LinkCountsObserver,
  RequestObserverType
} from '@data-story/core';

export const linkCountsObserver: MessageHandler = async({ event, webviewPanel, inputObserverController }) => {
  inputObserverController.pushExecutionObserver({
    ...event,
    onReceive: ({ links }) => {
      webviewPanel.webview.postMessage({
        links: links,
        type: RequestObserverType.linkCountsObserver,
        msgId: event!.msgId,
      });
    }
  } as LinkCountsObserver);
};