import { MessageHandler } from '../MessageHandler';
import {
  ObserveLinkCounts,
  RequestObserverType
} from '@data-story/core';

export const observeLinkCounts: MessageHandler = async({ event, postMessage, inputObserverController }) => {
  inputObserverController.addLinkCountsObserver({
    ...event,
    onReceive: ({ links }) => {
      postMessage({
        links: links,
        type: RequestObserverType.observeLinkCounts,
        msgId: event!.msgId,
      });
    }
  } as ObserveLinkCounts);
};