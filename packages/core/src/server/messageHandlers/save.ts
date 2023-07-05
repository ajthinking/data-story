import WebSocket from 'ws';
import { SaveMessage } from '../messages/SaveMessage';
import { FileStorage } from '../../FileStorage';
import { MessageHandler } from '../MessageHandler';

export const save: MessageHandler<SaveMessage> = async (
  ws: WebSocket,
  data: SaveMessage
) => {
  const storage = new FileStorage('.datastory')
  await storage.init()

  await storage.put(
    data.name,
    JSON.stringify(data.reactFlow, null, 2)
  )
}