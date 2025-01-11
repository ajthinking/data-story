import { MessageHandler } from '../MessageHandler';
import {
  GetDataFromStorageParams,
  ItemValue,
  LinkId
} from '@data-story/core';

export const getDataFromStorage: MessageHandler = async({ event, postMessage, inputObserverController }) => {
  const result: Record<LinkId, ItemValue[]> = await inputObserverController.getDataFromStorage(event as GetDataFromStorageParams);
  postMessage?.({
    ...event,
    data: result,
  });
};
