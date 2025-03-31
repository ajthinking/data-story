import { MessageHandler } from '../MessageHandler';
import {
  GetDataFromStorageParams,
  ItemValue,
  LinkId,
} from '@data-story/core';

export const getDataFromStorage: MessageHandler = async({ event, postMessage, observerController }) => {
  const result: Record<LinkId, ItemValue[]> = await observerController.getDataFromStorage(event as GetDataFromStorageParams);
  postMessage?.({
    ...event,
    data: result,
  });
};
