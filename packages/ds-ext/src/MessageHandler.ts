import { DiagramDocument } from './DiagramDocument';
import { ObserverController } from '@data-story/core';

export type MessageHandlerArgs = {
  postMessage: (msg: any) => boolean | undefined;
  event: any;
  document: DiagramDocument,
  observerController: ObserverController
};

export type MessageHandler = (args: MessageHandlerArgs) => Promise<() => void> | Promise<void>;
