import { Application } from '@data-story/core';
import { MessageHandler } from '../MessageHandler';
import { GetTreeMessage } from '../messages/GetTreeMessage';
import WebSocket from 'ws';

export const getTree: MessageHandler<GetTreeMessage> = async (
  ws: WebSocket,
  data: GetTreeMessage,
  app: Application
) => {
  const response = {
    type: 'GetTreeResponse',
    tree: app.getTreeManager().getTree({
      path: data.path,
    }),
  }

  ws.send(JSON.stringify(response))
}
