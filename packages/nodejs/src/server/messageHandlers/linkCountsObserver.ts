import { MessageHandler, MessageHandlerParams } from '../MessageHandler';
import {
  RequestObserverType,
  LinkCountsObserver
} from '@data-story/core';

export const linkCountsObserver: MessageHandler<LinkCountsObserver> = async({
  ws,
  data,
  inputObserverController
}: MessageHandlerParams<LinkCountsObserver>) => {
  inputObserverController.pushExecutionObserver({
    ...data,
    onReceive: ({ links, msgId }) => {
      ws.send(JSON.stringify({
        links: links,
        type: RequestObserverType.linkCountsObserver,
        msgId,
      }))
    }
  } as LinkCountsObserver);
}