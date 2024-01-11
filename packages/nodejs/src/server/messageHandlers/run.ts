import WebSocket from 'ws';
import { RunMessage } from '../messages/RunMessage';
import { MessageHandler } from '../MessageHandler';
import { Application, Diagram, Executor, ExecutionResult, ExecutionFailure, NullStorage } from '@data-story/core';

export const run: MessageHandler<RunMessage> = async (
  ws: WebSocket,
  data: RunMessage,
  app: Application
) => {
  // const diagram = DiagramFactory.fromReactFlow(
  //   data.reactFlow
  // )

  // TODO: Implement deserialize method
  const diagram = new Diagram(
    data.diagram.nodes,
    data.diagram.links,
  )

  const storage = new NullStorage()
  await storage.init()

  const executor = new Executor(
    diagram, 
    app.computers,
    storage
  )
  
  const execution = executor.execute()

  try {
    for await(const update of execution) {
      ws.send(JSON.stringify(update))
    }

    ws.send(
      JSON.stringify(
        new ExecutionResult(
          storage.currentExecutionId!
        )
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