import { WebSocketServer, WebSocket } from 'ws';
import { Application, ObserverController, ObserverStorage } from '@data-story/core';
import { MessageHandler } from './MessageHandler';
import * as defaultMessageHandlers from './messageHandlers';
import { createStorage } from '../storage/createStorage';
import { healthCheckHandler } from './healthCheck';
import { createServer, Server } from 'http';

interface SocketServerOptions {
  app: Application;
  port?: number;
  messageHandlers?: Record<string, MessageHandler<any>>;
}

export class SocketServer {
  private app: Application;
  private port: number;
  private messageHandlers: Record<string, MessageHandler<any>>;
  private wsServer?: WebSocketServer;
  private httpServer?: Server;
  private observerController: ObserverController;

  private observerStorage: ObserverStorage;

  constructor({
    app,
    messageHandlers = defaultMessageHandlers,
    port = 3300,
  }: SocketServerOptions) {
    this.app = app;
    this.port = port;
    this.messageHandlers = messageHandlers;
    this.observerStorage = createStorage();
    this.observerController = new ObserverController(this.observerStorage);
  }

  async start() {
    await this.observerStorage.init?.();
    console.log('Storage initialized');
    this.httpServer = createServer(healthCheckHandler);
    this.wsServer = new WebSocketServer({ server: this.httpServer });
    console.log('Server started on port ' + this.port);

    this.wsServer.on('connection', (ws) => {
      ws.on('message', (msg: string) => this.handleMessage(ws, msg));

      ws.on('close', () => {
        console.log('Client disconnected 😢');
      });

      ws.on('error', (error) => {
        console.log('Error 😱', error);
      });

      console.log('Client connected 💓');
    });

    await new Promise(resolve => this.httpServer!.listen(this.port, () => resolve(0)));
  }

  private async handleMessage(
    ws: WebSocket,
    message: string,
  ) {
    const parsed: { type: string } & Record<string, any> = JSON.parse(message);
    const handler = this.messageHandlers[parsed.type];

    if (!handler) {
      console.warn('Unknown message type (server): ' + parsed.type);
      return;
    }

    await handler({
      ws,
      data: parsed,
      app: this.app,
      observerController: this.observerController,
    });
  }
}
