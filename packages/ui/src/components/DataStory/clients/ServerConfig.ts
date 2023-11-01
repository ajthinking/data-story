import { Application } from '@data-story/core';

export type WebSocketServerConfig = {
  type: 'SOCKET';
  url: string;
}

export type JsServerConfig = {
  type: 'JS';
  app: Application;
}

export type ServerConfig = WebSocketServerConfig | JsServerConfig