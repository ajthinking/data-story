import { MessageHandler } from '../MessageHandler';
import {
  ObserveNodeStatus,
  RequestObserverType
} from '@data-story/core';

export const observeNodeStatus: MessageHandler = async({ event, webviewPanel, inputObserverController }) => {
  inputObserverController.addNodeStatusObserver({
    ...event,
    onReceive: ({ nodes }) => {
      console.log('observeNodeStatus onReceive postMessage content nodes - msgId:', nodes, event?.msgId);
      webviewPanel.webview.postMessage({
        nodes: nodes,
        type: RequestObserverType.observeNodeStatus,
        msgId: event!.msgId,
      });
    }
  } as ObserveNodeStatus);
};
