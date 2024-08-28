import WebSocket from 'ws';
import { Application, InMemoryStorage } from '@data-story/core';
import { MessageHandler } from './MessageHandler';
import * as defaultMessageHandlers from './messageHandlers';

interface SocketServerOptions {
  app: Application;
  port?: number;
  messageHandlers: Record<string, MessageHandler<any>>;
}

export class SocketServer {
  private app: Application;
  private port: number;
  private messageHandlers: Record<string, MessageHandler<any>>;
  private wsServer?: WebSocket.Server;

  constructor({
    app,
    messageHandlers = defaultMessageHandlers,
    port = 3300
  }: SocketServerOptions) {
    this.app = app;
    this.port = port;
    this.messageHandlers = messageHandlers;
  }

  start() {
    this.wsServer = new WebSocket.Server({ port: this.port });
    console.log('Server started on port ' + this.port);

    this.wsServer.on('connection', (ws) => {
      const storage = new InMemoryStorage();
      ws.on('message', (msg: string) => this.handleMessage(ws, msg, storage));

      ws.on('close', () => {
        console.log('Client disconnected 😢');
      });

      ws.on('error', (error) => {
        console.log('Error 😱', error);
      });

      console.log('Client connected 💓');
    });
  }

  private async handleMessage(
    ws: WebSocket,
    message: string,
    storage: InMemoryStorage
  ) {
    const parsed: { type: string } & Record<string, any> = JSON.parse(message);

    const handler = this.messageHandlers[parsed.type];
    if (!handler) throw new Error('Unknown message type (server): ' + parsed.type);

    await handler(ws, parsed, this.app, storage);
  }
}
