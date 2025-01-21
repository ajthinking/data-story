import { DiagramDocument } from './DiagramDocument';
import { InputObserverController } from '@data-story/core';

export type MessageHandlerArgs = {
  postMessage: (msg: any) => boolean | undefined;
  event: any;
  document: DiagramDocument,
  inputObserverController: InputObserverController
};

export type MessageHandler = (args: MessageHandlerArgs) => Promise<() => void> | Promise<void>;
