import { Diagram } from '@data-story/core';
import fs from 'fs/promises';
import { MessageHandler, MessageHandlerParams } from '../MessageHandler';

interface GetDiagramMessage {
  type: 'getDiagram';
  msgId: string;
  diagramId?: string;
}

export const getDiagram: MessageHandler<GetDiagramMessage> = async ({
  ws,
  data,
}: MessageHandlerParams<GetDiagramMessage>) => {
  if ('diagramId' in data && typeof data.diagramId === 'string') {
    const diagramData = await fs.readFile(data.diagramId, 'utf-8');
    const diagram = JSON.parse(diagramData);
    ws.send(JSON.stringify({
      ...data,
      type: 'getDiagram',
      diagram,
    }));
    return;
  }
  const diagram = new Diagram();
  ws.send(JSON.stringify({
    ...data,
    type: 'getDiagram',
    diagram,
  }));
};
