import WebSocket from 'ws';
import { Application, InMemoryStorage } from '@data-story/core';
import { MessageHandler } from '../MessageHandler';

export type GetItemsMessage = {
  type: 'getItems',
  atNodeId: string,
  id: string,
  offset?: number,
  limit?: number,
  total?: number,
}

export const getItems:  MessageHandler<GetItemsMessage> = async (
  ws: WebSocket,
  parsed: GetItemsMessage,
  app: Application,
  storage: InMemoryStorage
)  => {
  const {offset = 0, limit = 10, atNodeId, id} = parsed;
  const items = storage.itemsMap.get(atNodeId) ?? [];

  ws.send(JSON.stringify({
    type: 'UpdateStorage',
    items: items.slice(offset, limit + offset),
    nodeId: atNodeId,
    id: id,
    total: items.length,
  }));
};
