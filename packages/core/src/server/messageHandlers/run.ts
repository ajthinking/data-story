import WebSocket from 'ws';
import { DiagramFactory } from '../../DiagramFactory'
import { Executor } from '../../Executor'
import { RunMessage } from '../messages/RunMessage';
import { FileStorage } from '../../FileStorage';
import { ExecutionResult } from '../../ExecutionResult';
import { ComputerRegistry } from '../../computerRegistry';
import { ExecutionFailure } from '../../types/ExecutionFailure';
import { MessageHandler } from '../MessageHandler';
import { core } from '../../core';
import { Container } from '../../Container';

export const run: MessageHandler<RunMessage> = async (
  ws: WebSocket,
  data: RunMessage,
  app: Container
) => {
  const diagram = DiagramFactory.fromReactFlow(
    data.reactFlow
  )

  const storage = new FileStorage('.datastory')
  await storage.init()
  await storage.createExecution()

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
  } catch(error) {
    if (ws.readyState === WebSocket.OPEN) {
      console.log("Sending ExecutionFailure to client")
      console.log(error)

      const failure: ExecutionFailure = {
        type: "ExecutionFailure",
        message: 'Execution failed 😩 \nPlease review logs.',
        history: executor.memory.getHistory()
      }

      ws.send(JSON.stringify(failure))
    } else {
      console.log("WebSocket connection closed, unable to send ExecutionFailure")
    }

    return;
  }
}