import WebSocket from 'ws';
import { MessageHandler, MessageHandlerParams } from '../MessageHandler';
import {
  Diagram,
  ExecutionFailure,
} from '@data-story/core';

export type RunMessage = {
  msgId: string,
  type: 'run',
  diagram: Diagram,
}

export const run: MessageHandler<RunMessage> = async({
  ws,
  data,
  inputObserverController,
  app,
}: MessageHandlerParams<RunMessage>) => {
  const diagram = new Diagram({
    nodes: data.diagram.nodes,
    links: data.diagram.links,
  })

  const executor = app.getExecutor({
    diagram,
    inputObserverController,
  });

  const execution = executor.execute()

  try {
    for await(const update of execution) {}

    ws.send(
      JSON.stringify({
        msgId: data.msgId,
        type: 'ExecutionResult',
        time: Date.now(),
      }),
    )
  } catch(error: any) {
    if (ws.readyState === WebSocket.OPEN) {
      console.log('Sending ExecutionFailure to client')
      console.log(error)

      const failure: ExecutionFailure = {
        msgId: data.msgId,
        type: 'ExecutionFailure',
        message: error.message,
      }

      ws.send(JSON.stringify(failure))
    } else {
      console.log('WebSocket connection closed, unable to send ExecutionFailure')
    }

    return;
  }
}
