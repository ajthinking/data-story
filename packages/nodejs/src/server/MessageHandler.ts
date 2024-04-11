import { Application, InMemoryStorage } from '@data-story/core';
import { Message } from './Message';
import WebSocket from 'ws';

export type MessageHandler<MessageType extends Message> = (
  ws: WebSocket,
  message: MessageType,
  app: Application,
  storage: InMemoryStorage
) => Promise<void>
