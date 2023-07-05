import { Message } from './Message';
import WebSocket from 'ws';

export type MessageHandler<MessageType extends Message> = (
  ws: WebSocket,
  message: MessageType
) => Promise<void>