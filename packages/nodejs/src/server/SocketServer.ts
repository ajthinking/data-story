import WebSocket from 'ws';
import { onMessage } from './onMessage';
import { Application } from '@data-story/core';

interface SocketServerOptions {
  app: Application;
  port?: number;
}

export class SocketServer {
  private app: any; // replace 'any' with your app type
  private port: number;
  private wsServer?: WebSocket.Server;

  constructor({ app, port = 3100 }: SocketServerOptions) {
    this.app = app;
    this.port = port;
  }

  start() {
    this.wsServer = new WebSocket.Server({ port: this.port });

    this.wsServer.on('connection', (ws) => {
      ws.on('message', (msg: string) => onMessage(ws, msg, this.app));

      ws.on('close', () => {
        console.log('Client disconnected 😢');
      });

      ws.on('error', (error) => {
        console.log('Error 😱', error);
      });

      console.log('Client connected 💓');
    });
  }
}