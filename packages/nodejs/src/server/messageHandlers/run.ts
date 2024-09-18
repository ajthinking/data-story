import WebSocket from 'ws';
import { MessageHandler } from '../MessageHandler';
import {
  Application,
  Diagram,
  ExecutionFailure,
  ExecutionResult,
  ExecutorFactory,
  InMemoryStorage,
  InputObserverController,
  type ReportCallback
} from '@data-story/core';

import { type InputObserver } from '@data-story/core'

export type RunMessage = {
  type: 'run'
  diagram: Diagram,
  inputObservers: InputObserver[],
}

export const run: MessageHandler<RunMessage> = async(
  ws: WebSocket,
  data: RunMessage,
  app: Application,
  storage: InMemoryStorage
) => {
  storage.itemsMap.clear();
  const diagram = new Diagram({
    nodes: data.diagram.nodes,
    links: data.diagram.links,
  })

  const sendMsg: ReportCallback = (items, inputObservers) => {
    ws.send(JSON.stringify({
      type: 'NotifyObservers',
      inputObservers,
      items
    }))
  }

  const inputObserverController = new InputObserverController(
    data.inputObservers,
    sendMsg
  );

  const executor = app.getExecutor({
    diagram,
    storage,
    inputObserverController
  });

  const execution = executor.execute()

  try {
    for await(const update of execution) {
      ws.send(JSON.stringify(update))
    }

    ws.send(
      JSON.stringify(
        new ExecutionResult()
      )
    )
  } catch(error: any) {
    if (ws.readyState === WebSocket.OPEN) {
      console.log('Sending ExecutionFailure to client')
      console.log(error)

      const failure: ExecutionFailure = {
        type: 'ExecutionFailure',
        message: error.message,
        history: executor.memory.getHistory()
      }

      ws.send(JSON.stringify(failure))
    } else {
      console.log('WebSocket connection closed, unable to send ExecutionFailure')
    }

    return;
  }
}
