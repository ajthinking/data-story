import { GetDataFromStorage, LinkId, ItemValue, RequestObserverType } from '@data-story/core';
import { MessageHandler, MessageHandlerParams } from '../MessageHandler';

export const getDataFromStorage: MessageHandler<GetDataFromStorage> = async({
  ws,
  data,
  inputObserverController
}: MessageHandlerParams<GetDataFromStorage>) => {
  const result: Record<LinkId, ItemValue[]> = await inputObserverController.getDataFromStorage(data as GetDataFromStorage);
  ws.send(JSON.stringify({
    type: 'getDataFromStorage',
    msgId: data!.msgId,
    data: result
  }))
}