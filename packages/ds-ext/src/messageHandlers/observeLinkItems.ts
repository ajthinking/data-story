import { MessageHandler } from '../MessageHandler';
import { InputObserver, type ObserveLinkItems, ItemValue, RequestObserverType } from '@data-story/core';

export const observeLinkItems: MessageHandler = async ({ event, postMessage, inputObserverController }) => {
  return inputObserverController.addLinkItemsObserver({
    ...event,
    onReceive: (items: ItemValue[], inputObserver: InputObserver) => {
      postMessage?.({
        items,
        inputObserver,
        type: RequestObserverType.observeLinkItems,
        msgId: event!.msgId,
      });
    },
  } as ObserveLinkItems);
};