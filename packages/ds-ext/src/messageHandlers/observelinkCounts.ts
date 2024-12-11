import { MessageHandler } from '../MessageHandler';
import {
  ObservelinkCounts,
  RequestObserverType
} from '@data-story/core';

export const observelinkCounts: MessageHandler = async({ event, webviewPanel, inputObserverController }) => {
  inputObserverController.addLinkCountsObserver({
    ...event,
    onReceive: ({ links }) => {
      webviewPanel.webview.postMessage({
        links: links,
        type: RequestObserverType.observelinkCounts,
        msgId: event!.msgId,
      });
    }
  } as ObservelinkCounts);
};