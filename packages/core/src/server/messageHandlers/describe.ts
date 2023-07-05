import { MessageHandler } from '../MessageHandler';
import { ComputerRegistry } from '../../computerRegistry';
import { DescribeMessage } from '../messages/DescribeMessage';
import WebSocket from 'ws';

export const describe: MessageHandler<DescribeMessage> = async (
  ws: WebSocket,
  data: DescribeMessage
) => {
  const response = {
    type: 'DescribeResponse',
    availableNodes: ComputerRegistry.descriptions(),
  }

  ws.send(JSON.stringify(response))
}