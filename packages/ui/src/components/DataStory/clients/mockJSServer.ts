import {
  Application,
  Diagram,
  ExecutionFailure,
  InMemoryStorage,
  type InputObserver,
  InputObserverController,
  type ItemValue
} from '@data-story/core';
import { Subject } from 'rxjs';

type RunMessage = {
  msgId: string,
  type: 'run',
  diagram: Diagram,
  inputObservers: InputObserver[],
}

type HandlerParam = {data: unknown, sendEvent: (msg: Record<string, any>) => void}
type Message = {type: string} & Record<string, unknown>;
type Handler = (params: HandlerParam) => Promise<unknown>;
type MessageHandlers = {
  run: Handler,
  getNodeDescriptions: Handler,
  updateDiagram: Handler,
  [key: string]: Handler,
};

const JSDefaultMsgHandlers = (app: Application) => {
  const run = async({ data, sendEvent }: HandlerParam) => {
    const storage = new InMemoryStorage();
    const { msgId, diagram, inputObservers } = data as RunMessage;

    const inputObserverController = new InputObserverController(
      inputObservers || [],
      (items: ItemValue[], inputObservers: InputObserver[]) => {
        sendEvent({
          type: 'NotifyObservers',
          items,
          inputObservers
        });
      }
    );

    const executor = app!.getExecutor({
      diagram,
      storage,
      inputObserverController
    });

    try {
      const execution = executor?.execute();

      for await(const executionUpdate of execution) {
        sendEvent(executionUpdate);
      }

      const executionResult = {
        type: 'ExecutionResult',
        time: Date.now(),
      }
      sendEvent(executionResult);
    } catch(error: any) {
      const failure: ExecutionFailure = {
        msgId,
        type: 'ExecutionFailure',
        message: error?.message,
        history: executor.memory.getHistory()
      }
      sendEvent(failure);
    }
  };

  const getNodeDescriptions = async({ data, sendEvent }: HandlerParam) => {
    const nodeDescriptions = app!.descriptions();
    setTimeout(() => {
      sendEvent({
        ...data as Record<string, unknown>,
        availableNodes: nodeDescriptions
      });
    }, 1000);
  };

  const updateDiagram = async({ data, sendEvent }: HandlerParam) => {
    // save the diagram in localStorage ?
    console.log((data as {diagram: Diagram}).diagram, 'diagram');
  }

  return {
    run,
    getNodeDescriptions,
    updateDiagram,
  }
}

export class MockJSServer {
  chanel: Subject<any> = new Subject();
  private messageHandlers = {};

  constructor({ app, messageHandlers }: {app: Application, messageHandlers?: MessageHandlers}) {
    this.messageHandlers = messageHandlers ?? JSDefaultMsgHandlers(app);
    this.start();
  }

  handleMessage = async(message: Message) => {
    if (message.status !== 'client-post') return;
    const handler = this.messageHandlers[message.type] as (params: HandlerParam) => Promise<void>;
    if (!handler) throw new Error('Unknown message type (server): ' + message.type);
    const sendEvent = (msg: Record<string, any>) => {
      this.chanel.next({
        ...msg,
        status: 'server-post',
        msgId: message.msgId
      });
    }

    await handler({
      data: message,
      sendEvent
    });
  }

  private start() {
    this.chanel.subscribe((msg: Message) => {
      this.handleMessage(msg);
    });
    console.log('Client connected 💓');
  }
}
