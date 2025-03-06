import WebSocket from 'ws';
import { MessageHandler, MessageHandlerParams } from '../MessageHandler';
import {
  Diagram,
  ExecutionFailure,
} from '@data-story/core';
import { abortControllers } from './abortExecution';

export type RunMessage = {
  msgId: string,
  type: 'run',
  diagram: Diagram,
  executionId: string,
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
  const { executionId, msgId } = data

  const controller = new AbortController();
  abortControllers.set(executionId, controller);
  const abortSignal = controller.signal;

  const executor = app.getExecutor({
    diagram,
    inputObserverController,
  });

  const execution = executor.execute(abortSignal)

  try {
    for await(const update of execution) {}

    ws.send(
      JSON.stringify({
        msgId,
        type: 'ExecutionResult',
        time: Date.now(),
      }),
    )
  } catch(error: any) {
    if (error instanceof Error && error.message === 'Execution aborted') {
      ws.send(
        JSON.stringify({
          msgId,
          type: 'ExecutionAborted',
          executionId,
        }),
      );
    } else if (ws.readyState === WebSocket.OPEN) {
      console.log('Sending ExecutionFailure to client')
      console.log(error)

      const failure: ExecutionFailure = {
        msgId,
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
