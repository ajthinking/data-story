import { MessageHandler } from '../MessageHandler';
import {
  GetDataFromStorage,
  ItemValue,
  LinkId
} from '@data-story/core';

export const getDataFromStorage: MessageHandler = async({ event, webviewPanel, inputObserverController }) => {
  const result: Record<LinkId, ItemValue[]> = inputObserverController.getDataFromStorage(event as GetDataFromStorage);
  webviewPanel.webview.postMessage({
    ...event,
    data: result,
  });
};
