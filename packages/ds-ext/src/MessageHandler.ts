import { DiagramDocument } from './DiagramDocument';

export type MessageHandlerArgs = {
  postMessage: (msg: any) => boolean | undefined;
  event: any;
  document: DiagramDocument,
};

export type MessageHandler = (args: MessageHandlerArgs) => Promise<() => void> | Promise<void>;
