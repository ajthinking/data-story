import { GetDataFromStorageParams, LinkId, ItemValue, RequestObserverType } from '@data-story/core';
import { MessageHandler, MessageHandlerParams } from '../MessageHandler';

export const getDataFromStorage: MessageHandler<GetDataFromStorageParams> = async({
  ws,
  data,
  inputObserverController
}: MessageHandlerParams<GetDataFromStorageParams>) => {
  const result: Record<LinkId, ItemValue[]> = await inputObserverController.getDataFromStorage(data as GetDataFromStorageParams);
  ws.send(JSON.stringify({
    type: 'getDataFromStorage',
    msgId: data!.msgId,
    data: result
  }))
}