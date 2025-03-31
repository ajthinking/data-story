import { ObserveLinkUpdate, RequestObserverType } from '@data-story/core';
import { MessageHandler, MessageHandlerParams } from '../MessageHandler';

export const observeLinkUpdate: MessageHandler<ObserveLinkUpdate> = async({
  ws,
  data,
  observerController,
}: MessageHandlerParams<ObserveLinkUpdate>) => {
  observerController.observeLinkUpdate({
    ...data,
    onReceive: () => {
      ws.send(JSON.stringify({
        type: RequestObserverType.observeLinkUpdate,
        msgId: data!.msgId,
        linkIds: data!.linkIds,
      }))
    },
  } as ObserveLinkUpdate);
}