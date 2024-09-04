import { Application, core, nodes } from '@data-story/core';
import { MessageHandler } from '../MessageHandler';
import { GetTreeMessage } from '../messages/GetTreeMessage';
import WebSocket from 'ws';

export const getTree: MessageHandler<GetTreeMessage> = async(
  ws: WebSocket,
  data: GetTreeMessage,
  app: Application
) => {
  const tree = await app.getTreeManager().getTree({
    path: data.path,
  })
  console.log('tree', tree);
  const response = {
    id: data.id,
    awaited: data.awaited,
    type: 'GetTreeResponse',
    tree: [tree],
  }
  ws.send(JSON.stringify(response))
}
