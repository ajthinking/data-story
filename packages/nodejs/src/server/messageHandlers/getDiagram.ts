import { Diagram } from '@data-story/core';
import { MessageHandler, MessageHandlerParams } from '../MessageHandler';

interface GetDiagramMessage {
  type: 'getDiagram';
  msgId: string;
}

export const getDiagram: MessageHandler<GetDiagramMessage> = async({
  ws,
  data,
}: MessageHandlerParams<GetDiagramMessage>) => {
  const diagram = new Diagram();
  ws.send(JSON.stringify({
    ...data,
    type: 'getDiagram',
    diagram,
  }));
}
