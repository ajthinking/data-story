import { MessageHandler, MessageHandlerParams } from '../MessageHandler';
import {
  RequestObserverType,
  ObserveLinkCounts,
} from '@data-story/core';

export const observeLinkCounts: MessageHandler<ObserveLinkCounts> = async({
  ws,
  data,
  inputObserverController,
}: MessageHandlerParams<ObserveLinkCounts>) => {
  inputObserverController.addLinkCountsObserver({
    ...data,
    onReceive: ({ links }) => {
      ws.send(JSON.stringify({
        links: links,
        type: RequestObserverType.observeLinkCounts,
        msgId: data.msgId,
      }))
    },
  } as ObserveLinkCounts);
}