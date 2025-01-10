import { MessageHandler } from '../MessageHandler';
import {
  ObserveNodeStatus,
  RequestObserverType
} from '@data-story/core';

export const observeNodeStatus: MessageHandler = async({ event, postMessage, inputObserverController }) => {
  return inputObserverController.addNodeStatusObserver({
    ...event,
    onReceive: ({ nodes }) => {
      console.log(nodes, 'observeNodeStatus - ds-ext');
      postMessage?.({
        nodes: nodes,
        type: RequestObserverType.observeNodeStatus,
        msgId: event!.msgId,
      });
    }
  } as ObserveNodeStatus);
};
