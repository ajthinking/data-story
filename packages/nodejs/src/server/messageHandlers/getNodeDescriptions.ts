import { Application } from '@data-story/core';
import { MessageHandler } from '../MessageHandler';
import WebSocket from 'ws';

export type DescribeMessage = {
  type: 'getNodeDescriptions',
  id: string,
}

export const getNodeDescriptions: MessageHandler<DescribeMessage> = async (
  ws: WebSocket,
  data: DescribeMessage,
  app: Application
) => {
  const response = {
    ...data,
    availableNodes: app.descriptions(),
  }

  ws.send(JSON.stringify(response))
}
