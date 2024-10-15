import WebSocket from 'ws';
import { MessageHandler } from '../MessageHandler';
import {
  Application,
  Diagram,
  ExecutionFailure,
  InMemoryStorage,
  InputObserverController,
  type ReportCallback
} from '@data-story/core';
import { type InputObserver } from '@data-story/core'

export type RunMessage = {
  msgId: string,
  type: 'run',
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
      msgId: data.msgId,
      type: 'NotifyObservers',
      inputObservers,
      items,
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

  console.log('sendMsg', sendMsg);
  try {
    for await(const update of execution) {
      ws.send(JSON.stringify({
        ...update,
        msgId: data.msgId,
      }))
    }

    ws.send(
      JSON.stringify({
        msgId: data.msgId,
        type: 'ExecutionResult',
        time: Date.now()
      })
    )
  } catch(error: any) {
    if (ws.readyState === WebSocket.OPEN) {
      console.log('Sending ExecutionFailure to client')
      console.log(error)

      const failure: ExecutionFailure = {
        msgId: data.msgId,
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
