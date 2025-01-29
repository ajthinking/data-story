import { MessageHandler, MessageHandlerParams } from '../MessageHandler';

export type DescribeMessage = {
  type: 'getNodeDescriptions',
  msgId: string;
}

export const getNodeDescriptions: MessageHandler<DescribeMessage> = async ({
  ws,
  data,
  app,
}: MessageHandlerParams<DescribeMessage>,
) => {
  const response = {
    ...data,
    availableNodes: app.descriptions(),
  }

  ws.send(JSON.stringify(response))
}
