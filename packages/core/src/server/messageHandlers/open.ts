import { promises as fs } from 'fs'
import { OpenMessage } from '../messages/OpenMessage'
import { MessageHandler } from '../MessageHandler'
import WebSocket from 'ws';

export const open: MessageHandler<OpenMessage> = async (
  ws: WebSocket,
  message: OpenMessage
) => {
  const response = {
    type: 'OpenResponse',
    flow: JSON.parse(
      // TODO it seems this handler is totally outdated
      (await fs.readFile(__dirname + '/../../.datastory/demo.story.json')).toString()
    ),
  }

  ws.send(JSON.stringify(response))  
}