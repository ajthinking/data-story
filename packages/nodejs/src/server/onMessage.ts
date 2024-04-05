import WebSocket from 'ws';
import { describe, run } from './messageHandlers'
import { MessageHandler } from './MessageHandler';
import { Application, NullStorage } from '@data-story/core';

const storage = new NullStorage()
export const onMessage = async (
  ws: WebSocket,
  message: string,
  app: Application,
) => {
  const parsed: { type: string } & Record<string, any> = JSON.parse(message.toString())
  console.log('parsed', parsed.type);

  const handlers: Record<string, MessageHandler<any>> = {
    describe,
    run,
  }

  if (parsed.type === 'getItems') {
    const items = storage.items.get(parsed.atNodeId)
    ws.send(JSON.stringify({
      type: 'UpdateStorage',
      items,
      nodeId: parsed?.atNodeId,
    }));
  } else {
    const handler = handlers[parsed.type];
    if(!handler) throw('Unknown message type: ' + parsed.type)
    await handler(ws, parsed, app, storage)
  }
}
