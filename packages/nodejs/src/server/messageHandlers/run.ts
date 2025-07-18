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
  observerController,
  app,
}: MessageHandlerParams<RunMessage>) => {
  const diagram = new Diagram({
    nodes: data.diagram.nodes,
    links: data.diagram.links,
    params: data.diagram.params,
  })
  const startTime = performance.now();
  const { executionId, msgId } = data

  const controller = new AbortController();
  abortControllers.set(executionId, controller);
  const abortSignal = controller.signal;

  const executor = app.getExecutor({
    diagram,
    observerController,
  });

  const execution = executor.execute(abortSignal)

  try {
    for await(const update of execution) {}

    ws.send(
      JSON.stringify({
        msgId,
        type: 'ExecutionResult',
        time: performance.now() - startTime,
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
