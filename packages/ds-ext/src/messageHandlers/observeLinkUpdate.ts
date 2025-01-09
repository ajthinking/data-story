import { MessageHandler } from '../MessageHandler';
import {
  ObserveLinkUpdate,
  RequestObserverType
} from '@data-story/core';

export const observeLinkUpdate: MessageHandler = async({ event, postMessage, inputObserverController }) => {
  inputObserverController.observeLinkUpdate({
    ...event,
    onReceive: () => {
      postMessage({
        linkIds: event.linkIds,
        type: RequestObserverType.observeLinkUpdate,
        msgId: event!.msgId,
      });
    }
  } as ObserveLinkUpdate);
};
