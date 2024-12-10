import { MessageHandler, MessageHandlerParams } from '../MessageHandler';
import {
  type InputObserver,
  type ItemValue,
  type LinkItemsObserver,
  RequestObserverType,
} from '@data-story/core';

export const linkItemsObserver: MessageHandler<LinkItemsObserver> = async({
  ws,
  data,
  inputObserverController
}: MessageHandlerParams<LinkItemsObserver>) => {
  inputObserverController.addlinkItemsObserver({
    ...data,
    onReceive: (items: ItemValue[], inputObserver: InputObserver) => {
      ws.send(JSON.stringify({
        items,
        inputObserver,
        type: RequestObserverType.linkItemsObserver,
        msgId: data!.msgId,
      }))
    }
  } as LinkItemsObserver);
}