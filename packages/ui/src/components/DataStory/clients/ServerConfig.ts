export type WebSocketServerConfig = {
  type: 'SOCKET';
  url: string;
}

export type JsServerConfig = {
  type: 'JS';
}

export type ServerConfig = WebSocketServerConfig | JsServerConfig