import { MessageHandler, MessageHandlerParams } from '../MessageHandler';
import {
  type InputObserver,
  type ItemValue,
  RequestObserverType,
  type ItemsObserver
} from '@data-story/core';

export const itemsObserver: MessageHandler<ItemsObserver> = async({
  ws,
  data,
  inputObserverController
}: MessageHandlerParams<ItemsObserver>) => {
  inputObserverController.addItemsObserver({
    ...data,
    onReceive: (items: ItemValue[], inputObserver: InputObserver) => {
      ws.send(JSON.stringify({
        items,
        inputObserver,
        type: RequestObserverType.itemsObserver,
        msgId: data!.msgId,
      }))
    }
  } as ItemsObserver);
}