import { MessageHandler } from '../MessageHandler';
import {
  ObserveLinkUpdate,
  RequestObserverType
} from '@data-story/core';

export const observeLinkUpdate: MessageHandler = async({ event, webviewPanel, inputObserverController }) => {
  console.log('observeLinkUpdate event:', event, 'onReceive:', event.linkIds);
  inputObserverController.observeLinkUpdate({
    ...event,
    onReceive: () => {
      webviewPanel.webview.postMessage({
        linkIds: event.linkIds,
        type: RequestObserverType.observeLinkUpdate,
        msgId: event!.msgId,
      });
    }
  } as ObserveLinkUpdate);
};
