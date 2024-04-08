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
  const items = storage.items.get(parsed.atNodeId) ?? [];

  ws.send(JSON.stringify({
    type: 'UpdateStorage',
    items,
    nodeId: parsed?.atNodeId,
    id: parsed?.id,
  }));
};
