import WebSocket from 'ws';
import { describe, run } from './messageHandlers'
import { MessageHandler } from './MessageHandler';
import { Application, NullStorage } from '@data-story/core';
import { getItems } from './messageHandlers/getItems';

const storage = new NullStorage()

export const onMessage = async (
  ws: WebSocket,
  message: string,
  app: Application,
) => {
  const parsed: { type: string } & Record<string, any> = JSON.parse(message.toString())

  const handlers: Record<string, MessageHandler<any>> = {
    describe,
    run,
    getItems
  }

  const handler = handlers[parsed.type];
  if(!handler) throw('Unknown message type: ' + parsed.type)
  await handler(ws, parsed, app, storage)
}
