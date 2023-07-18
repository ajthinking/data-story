import { MessageHandler } from '../MessageHandler';
import { ComputerRegistry } from '../../computerRegistry';
import { DescribeMessage } from '../messages/DescribeMessage';
import WebSocket from 'ws';
import { Container } from '../../Container';

export const describe: MessageHandler<DescribeMessage> = async (
  ws: WebSocket,
  data: DescribeMessage,
  app: Container
) => {
  const response = {
    type: 'DescribeResponse',
    availableNodes: app.descriptions(),
  }

  ws.send(JSON.stringify(response))
}