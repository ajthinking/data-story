import { MessageHandler, MessageHandlerParams } from '../MessageHandler';
import {
  RequestObserverType,
  ObservelinkCounts
} from '@data-story/core';

export const observeLinkCounts: MessageHandler<ObservelinkCounts> = async({
  ws,
  data,
  inputObserverController
}: MessageHandlerParams<ObservelinkCounts>) => {
  inputObserverController.addLinkCountsObserver({
    ...data,
    onReceive: ({ links }) => {
      ws.send(JSON.stringify({
        links: links,
        type: RequestObserverType.observeLinkCounts,
        msgId: data.msgId
      }))
    }
  } as ObservelinkCounts);
}