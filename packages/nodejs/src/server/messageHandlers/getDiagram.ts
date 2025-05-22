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
  let diagram: Diagram | undefined;

  if ('diagramId' in data && typeof data.diagramId === 'string') {
    try {
      const diagramData = await fs.readFile(data.diagramId, 'utf-8');
      diagramData && (diagram = JSON.parse(diagramData));
    } catch (error) {
      console.error('Error reading diagram file:', error);
    }
  }

  if (!diagram) {
    diagram = new Diagram();
  }

  ws.send(JSON.stringify({
    ...data,
    type: 'getDiagram',
    diagram,
  }));
};
