import WebSocket from 'ws';
import { RunMessage } from '../messages/RunMessage';
import { MessageHandler } from '../MessageHandler';
import {
  type NotifyObserversCallback,
  InputObserverController,
  ExecutorFactory,
  Application,
  Diagram,
  Executor,
  ExecutionResult,
  ExecutionFailure,
  InMemoryStorage,
  InputObserver
} from '@data-story/core';

export const run: MessageHandler<RunMessage> = async (
  ws: WebSocket,
  data: RunMessage,
  app: Application,
  storage: InMemoryStorage
) => {
  // const diagram = DiagramFactory.fromReactFlow(
  //   data.reactFlow
  // )

  storage.itemsMap.clear();
  // TODO: Implement deserialize method
  const diagram = new Diagram({
    nodes: data.diagram.nodes,
    links: data.diagram.links,
  })

  const sendMsg: NotifyObserversCallback = (InputObserver, items) => {
    ws.send(JSON.stringify({
      type: 'NotifyObservers',
      InputObserver,
      items
    }))
  }

  const inputObserverController = new InputObserverController(
    data.InputObserver,
    sendMsg
  );

  const executor = ExecutorFactory.create(
    diagram,
    app.registry,
    storage,
    inputObserverController
  )

  const execution = executor.execute()

  try {
    for await(const update of execution) {
      ws.send(JSON.stringify(update))
    }
    console.log(new ExecutionResult(), 'ExecutionResult')
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
