import WebSocket from 'ws';
import { Application, InMemoryStorage } from '@data-story/core';
import { MessageHandler, MessageHandlerParams } from '../MessageHandler';

export type GetItemsMessage = {
  type: 'getItems',
  atNodeId: string,
  id: string,
  offset?: number,
  limit?: number,
  total?: number,
}

export const getItems: MessageHandler<GetItemsMessage> = async({
  ws,
  data,
  storage
}: MessageHandlerParams<GetItemsMessage>) => {
  const { offset = 0, limit = 10, atNodeId, id } = data;
  const items = storage.itemsMap.get(atNodeId) ?? [];

  ws.send(JSON.stringify({
    type: 'UpdateStorage',
    items: items.slice(offset, limit + offset),
    nodeId: atNodeId,
    id: id,
    total: items.length,
  }));
};
