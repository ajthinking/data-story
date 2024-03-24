import WebSocket from 'ws';
import { describe, run } from './messageHandlers'
import { MessageHandler } from './MessageHandler';
import { Application } from '@data-story/core';

export const onMessage = async (
  ws: WebSocket,
  message: string,
  app: Application,
) => {
  const parsed: { type: string } = JSON.parse(message.toString())

  const handlers: Record<string, MessageHandler<any>> = {
    describe,
    run,
  }

  const handler = handlers[parsed.type];
  if(!handler) throw('Unknown message type: ' + parsed.type)

  await handler(ws, parsed, app)
}