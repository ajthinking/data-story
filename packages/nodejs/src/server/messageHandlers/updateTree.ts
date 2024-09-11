import { Application, core, nodes } from '@data-story/core';
import { MessageHandler } from '../MessageHandler';
import WebSocket from 'ws';

import { Tree } from '@data-story/core'

export type UpdateTreeMessage = {
  id: string,
  awaited: boolean,
  type: 'updateTree',
  path: string,
  tree: Tree,
}

export const updateTree: MessageHandler<UpdateTreeMessage> = async(
  ws: WebSocket,
  data: UpdateTreeMessage,
  app: Application
) => {
  console.log('Updating tree from updateTree on server')

  const updatedTree = await app.getTreeManager().updateTree({
    tree: data.tree,
    path: data.path,
  });

  const response = {
    id: data.id,
    awaited: data.awaited,
    type: 'UpdateTreeResponse',
    tree: [],
  }

  ws.send(JSON.stringify(response))
}
