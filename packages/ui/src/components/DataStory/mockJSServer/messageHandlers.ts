import {
  Application,
  Diagram,
  ExecutionFailure,
  InMemoryStorage,
  type InputObserver,
  InputObserverController,
  type ItemValue, RequestObserverType,
  type ItemsObserver, LinkCountsObserver
} from '@data-story/core';
import { loadDiagram, saveDiagram } from './storeDiagram';

type RunMessage = {
  msgId: string,
  type: 'run',
  diagram: Diagram,
  inputObservers: InputObserver[],
}

export type HandlerParam = {data: unknown, sendEvent: (msg: Record<string, any>) => void};
export type Message = {type: string} & Record<string, unknown>;

type Handler = (params: HandlerParam) => Promise<unknown>;
export type MessageHandlers = {
  run: Handler,
  getNodeDescriptions: Handler,
  updateDiagram: Handler,
  [key: string]: Handler,
};
const LocalStorageKey = 'data-story-tree';

export const getDefaultMsgHandlers = (app: Application, inputObserverController: InputObserverController ) => {
  const run = async({ data, sendEvent }: HandlerParam) => {
    const storage = new InMemoryStorage();
    const { diagram } = data as RunMessage;

    const executor = app!.getExecutor({
      diagram,
      storage,
      inputObserverController,
    });

    try {
      const execution = executor?.execute();

      for await(const executionUpdate of execution) {
        // 在这里更新 links count 无法使用 throttle，因为都是用的执行的最新状态
        // sendEvent({
        //   ...executionUpdate,
        //   type: 'LinkCountsObserver'
        // })
        sendEvent(executionUpdate);
      }

      const executionResult = {
        type: 'ExecutionResult',
        time: Date.now(),
      }
      sendEvent(executionResult);
    } catch(error: any) {
      const failure: ExecutionFailure = {
        type: 'ExecutionFailure',
        message: error?.message,
        history: executor.memory.getHistory()
      }
      sendEvent(failure);
    }
  };

  const linkCountsObserver = ({ data, sendEvent }: HandlerParam) => {
    console.log('LinkCountsObserver', data);
    inputObserverController.pushExecutionObserver({
      ...data as LinkCountsObserver,
      onReceive: (counts: Record<string, number>) => {
        sendEvent({
          counts,
          type: RequestObserverType.linkCountsObserver
        })
      }
    })
  }

  const itemsObserver = ({ data, sendEvent }: HandlerParam) => {
    inputObserverController.pushExecutionObserver({
      ...data as ItemsObserver,
      onReceive: (items: ItemValue[], inputObserver: InputObserver) => {
        sendEvent({
          items,
          inputObserver,
          type: RequestObserverType.itemsObserver
        })
      }
    } as ItemsObserver);
  }

  const notifyDataUpdate = ({ data, sendEvent }: HandlerParam) => {
    console.log('NotifyDataUpdate', data);
  }
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
    saveDiagram(LocalStorageKey, (data as {diagram: Diagram}).diagram);
  }

  const getDiagram = async({ data, sendEvent }: HandlerParam) => {
    const localDiagram = loadDiagram(LocalStorageKey);

    sendEvent({
      ...data as Record<string, unknown>,
      diagram: localDiagram.diagram
    });
  };

  return {
    run,
    getNodeDescriptions,
    updateDiagram,
    getDiagram,
    linkCountsObserver,
    itemsObserver,
    notifyDataUpdate
  }
}
