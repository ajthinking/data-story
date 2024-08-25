import { Application } from '@data-story/core';
import { MessageHandler } from '../MessageHandler';
import { DescribeMessage } from '../messages/DescribeMessage';
import WebSocket from 'ws';

export const describe: MessageHandler<DescribeMessage> = async (
  ws: WebSocket,
  data: DescribeMessage,
  app: Application
) => {
  const response = {
    type: 'DescribeResponse',
    availableNodes: app.descriptions(),
  }

  ws.send(JSON.stringify(response))
}
