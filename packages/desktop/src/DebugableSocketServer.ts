import { Application, Diagram, ExecutionFailure, ExecutionResult, Executor, NullStorage } from '@data-story/core';
import fs from 'fs';
import WebSocket from 'ws';

interface SocketServerOptions {
  app: Application;
  port?: number;
}

const run = async (
  ws: WebSocket,
  data: any,
  app: Application,
  logger: any
) => {
  logger.log('In run!');

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
          '0'
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

const fileConsole = {
  log: (msg: string) => {
    const hour_minutes_seconds = new Date().toLocaleTimeString('sv-SE', { hour12: false })
    const file = '/Users/anders/Code/ajthinking/datastory-desktop/log.txt';

    // append row in file
    fs.appendFile(file, `${hour_minutes_seconds}: ${msg}\n`, function (err: any) {
      if (err) throw err;
    });
  }
}

export class DebugableSocketServer {
  private app: Application;
  private port: number;
  private wsServer: any; //WebSocket.Server;
  private logger = fileConsole;

  constructor({ app: dsApp, port = 3100 }: SocketServerOptions) {
    this.app = dsApp;
    this.port = port;
  }

  start() {
    this.wsServer = new WebSocket.Server({ port: this.port });

    this.wsServer.on('connection', (ws: any) => {
      this.logger.log('Client connected 💓');

      ws.on('message', (msg: string) => {
        this.logger.log(`Got message: ${msg.toString()}`);
        const parsed: { type: string } = JSON.parse(msg.toString())

        if(parsed.type === 'describe') {
          const response = {
            type: 'DescribeResponse',
            availableNodes: this.app.descriptions(),
          }

          ws.send(JSON.stringify(response))
        }

        if(parsed.type === 'run') run(ws, parsed, this.app, this.logger)
      });

      ws.on('close', () => {
        console.log('Client disconnected 😢');
      });

      ws.on('error', (error: any) => {
        console.log('Error 😱', error);
      });

      console.log('Client connected 💓');
    });
  }
}