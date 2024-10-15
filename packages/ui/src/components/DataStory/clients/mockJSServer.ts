import {
  Application, Diagram, ExecutionFailure,
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

const JSDefaultMsgHandlers = (app: Application) => {
  const run = async({ data, sendEvent }: HandlerParam) => {
    const storage = new InMemoryStorage();
    const notifyObservers$: Subject<{items: ItemValue[], inputObservers: InputObserver[]}> = new Subject();
    const { msgId, diagram, inputObservers } = data as RunMessage;
    const inputObserverController = new InputObserverController(
      inputObservers || [],
      (items: ItemValue[], inputObservers: InputObserver[]) => {
        notifyObservers$.next({ items, inputObservers });
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
        console.log(executionUpdate);
        sendEvent(executionUpdate);
      }

      const executionResult = {
        msgId,
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
  private messageHandlers = {};
  chanel: Subject<any> = new Subject();

  constructor(app: Application) {
    this.messageHandlers = JSDefaultMsgHandlers(app);
    this.start();
  }

  start() {
    this.chanel.subscribe((msg: Message) => {
      console.log('Client connected 💓');
      this.handleMessage(msg);
    });
  }

  handleMessage = async(message: Message) => {
    if (message.status !== 'client-post') return;
    const handler = this.messageHandlers[message.type] as (params: HandlerParam) => Promise<void>;
    if (!handler) throw new Error('Unknown message type (server): ' + message.type);
    const sendEvent = (msg: Record<string, any>) => {
      console.log('sendEvent', msg);
      this.chanel.next({
        ...msg,
        status: 'server-post'
      });
    }

    await handler({
      data: message,
      sendEvent
    });
  }
}
