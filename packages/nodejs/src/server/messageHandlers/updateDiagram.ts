import fs from 'fs/promises';

import { MessageHandler, MessageHandlerParams } from '../MessageHandler';

export interface UpdateDiagramMessage {
  type: 'updateDiagram';
  diagram: unknown;
  diagramId?: string;
}

export const updateDiagram: MessageHandler<UpdateDiagramMessage> =
  async ({
    ws, data,
  }: MessageHandlerParams<UpdateDiagramMessage>) => {
    if (data.diagramId) {
      const diagramData = JSON.stringify(data.diagram);
      await fs.writeFile(data.diagramId, diagramData, 'utf-8');
      console.log('saved diagram', data.diagramId);
      const resp = Object.assign({}, data);
      delete resp.diagram;
      ws.send(JSON.stringify({
        ...resp,
      }));
    }
  };
