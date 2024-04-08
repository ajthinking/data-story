import WebSocket from 'ws';
import { Application, NullStorage } from '@data-story/core';
import { MessageHandler } from '../MessageHandler';
import { GetItemsMessage } from '../messages/getItemsMessage';

export const getItems:  MessageHandler<GetItemsMessage> = async (
  ws: WebSocket,
  parsed: GetItemsMessage,
  app: Application,
  storage: NullStorage
)  => {
  const {offset = 0, limit = 10, atNodeId, id} = parsed;
  const items = storage.items.get(atNodeId) ?? [];

  ws.send(JSON.stringify({
    type: 'UpdateStorage',
    items: items.slice(offset, limit + offset),
    nodeId: atNodeId,
    id: id,
  }));
};
