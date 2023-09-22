import { Application } from '../Application';
import { Message } from './Message';
import WebSocket from 'ws';
export type MessageHandler<MessageType extends Message> = (ws: WebSocket, message: MessageType, app: Application) => Promise<void>;
