import { MessageHandler } from '../MessageHandler';
import {
  ObserveNodeStatus,
  RequestObserverType
} from '@data-story/core';

export const observeNodeStatus: MessageHandler = async({ event, postMessage, inputObserverController }) => {
  inputObserverController.addNodeStatusObserver({
    ...event,
    onReceive: ({ nodes }) => {
      postMessage({
        nodes: nodes,
        type: RequestObserverType.observeNodeStatus,
        msgId: event!.msgId,
      });
    }
  } as ObserveNodeStatus);
};
