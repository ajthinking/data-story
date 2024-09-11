import { Application } from '@data-story/core';
import { MessageHandler } from '../MessageHandler';
import WebSocket from 'ws';

export type DescribeMessage = {
  type: 'describe',
  id: string,
}

export const describe: MessageHandler<DescribeMessage> = async (
  ws: WebSocket,
  data: DescribeMessage,
  app: Application
) => {
  const response = {
    ...data,
    type: 'DescribeResponse',
    availableNodes: app.descriptions(),
  }

  ws.send(JSON.stringify(response))
}
