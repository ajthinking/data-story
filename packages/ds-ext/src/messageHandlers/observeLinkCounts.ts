import { MessageHandler } from '../MessageHandler';
import {
  ObserveLinkCounts,
  RequestObserverType
} from '@data-story/core';

export const observeLinkCounts: MessageHandler = async({ event, webviewPanel, inputObserverController }) => {
  inputObserverController.addLinkCountsObserver({
    ...event,
    onReceive: ({ links }) => {
      webviewPanel.webview.postMessage({
        links: links,
        type: RequestObserverType.observeLinkCounts,
        msgId: event!.msgId,
      });
    }
  } as ObserveLinkCounts);
};