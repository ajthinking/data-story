import { Container } from "@data-story/core";

export type WebSocketServerConfig = {
  type: 'SOCKET';
  url: string;
}

export type JsServerConfig = {
  type: 'JS';
  app: Container;
}

export type ServerConfig = WebSocketServerConfig | JsServerConfig