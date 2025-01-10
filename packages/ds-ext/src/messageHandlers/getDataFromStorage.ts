import { MessageHandler } from '../MessageHandler';
import {
  GetDataFromStorageParams,
  ItemValue,
  LinkId
} from '@data-story/core';

export const getDataFromStorage: MessageHandler = async({ event, webviewPanel, inputObserverController }) => {
  const result: Record<LinkId, ItemValue[]> = await inputObserverController.getDataFromStorage(event as GetDataFromStorageParams);
  webviewPanel.webview.postMessage({
    ...event,
    data: result,
  });
};
