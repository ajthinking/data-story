import { Diagram } from '@data-story/core';
import WebSocket from 'ws';
import { MessageHandler } from '../MessageHandler';

interface GetDiagramMessage {
  type: 'getDiagram';
  msgId: string;
}

export const getDiagram: MessageHandler<GetDiagramMessage> = async(
  ws: WebSocket,
  data: GetDiagramMessage,
) => {
  const diagram = new Diagram();
  ws.send(JSON.stringify({
    ...data,
    type: 'getDiagram',
    diagram,
  }));
}
