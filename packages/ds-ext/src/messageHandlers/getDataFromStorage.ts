import { MessageHandler } from '../MessageHandler';
import {
  GetDataFromStorage,
  ItemValue,
  LinkId
} from '@data-story/core';

export const getDataFromStorage: MessageHandler = async({ event, webviewPanel, inputObserverController }) => {
  const result: Record<LinkId, ItemValue[]> = inputObserverController.getDataFromStorage(event as GetDataFromStorage);
  console.log('getDataFromStorage postMessage content:', result, event);
  webviewPanel.webview.postMessage({
    ...event,
    data: result,
  });
};
