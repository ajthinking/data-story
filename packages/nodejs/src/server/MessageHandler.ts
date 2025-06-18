import { Application, ObserverController } from '@data-story/core';
import { Message } from './Message';
import { WebSocket } from 'ws';

export interface MessageHandlerParams<MessageType extends Message> {
  ws: WebSocket;
  data: MessageType;
  app: Application;
  observerController: ObserverController;
}

export type MessageHandler<MessageType extends Message> = (params: MessageHandlerParams<MessageType>) => Promise<void>
