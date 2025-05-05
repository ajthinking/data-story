import { Diagram } from '@data-story/core';
import fs from 'fs/promises';
import { MessageHandler, MessageHandlerParams } from '../MessageHandler';

interface GetDiagramMessage {
  type: 'getDiagram';
  msgId: string;
}

export const getDiagram: MessageHandler<GetDiagramMessage> = async ({
  ws,
  data,
}: MessageHandlerParams<GetDiagramMessage>) => {
  if ('path' in data && typeof data.path === 'string') {
    const diagramData = await fs.readFile(data.path, 'utf-8');
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
