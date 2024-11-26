import { MessageHandler } from '../MessageHandler';
import {
  LinkCountsObserver,
  RequestObserverType
} from '@data-story/core';

export const linkCountsObserver: MessageHandler = async({ event, webviewPanel, inputObserverController }) => {
  inputObserverController.pushExecutionObserver({
    ...event,
    onReceive: ({ links }) => {
      webviewPanel.webview.postMessage(JSON.stringify({
        links: links,
        type: RequestObserverType.linkCountsObserver
      }));
    }
  } as LinkCountsObserver);
};