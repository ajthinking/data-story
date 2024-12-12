import { MessageHandler, MessageHandlerParams } from '../MessageHandler';
import {
  RequestObserverType,
  ObservelinkCounts
} from '@data-story/core';

export const observelinkCounts: MessageHandler<ObservelinkCounts> = async({
  ws,
  data,
  inputObserverController
}: MessageHandlerParams<ObservelinkCounts>) => {
  inputObserverController.addLinkCountsObserver({
    ...data,
    onReceive: ({ links }) => {
      ws.send(JSON.stringify({
        links: links,
        type: RequestObserverType.observelinkCounts,
        msgId: data.msgId
      }))
    }
  } as ObservelinkCounts);
}