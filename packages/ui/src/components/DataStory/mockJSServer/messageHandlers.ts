import {
  Application,
  Diagram,
  ExecutionFailure,
  InMemoryStorage,
  type InputObserver,
  InputObserverController,
  InputObserverController1,
  type ItemValue, RequestObserverType
} from '@data-story/core';
import { loadDiagram, saveDiagram } from './storeDiagram';
import { ItemsObserver } from '../types';

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

export const getDefaultMsgHandlers = (app: Application) => {
  const inputObserverControllerMock = new InputObserverController1();
  const run = async({ data, sendEvent }: HandlerParam) => {
    const storage = new InMemoryStorage();
    const { diagram, inputObservers } = data as RunMessage;

    const inputObserverController = new InputObserverController(
      inputObservers || [],
      ({ items }: {
        items: ItemValue[],
        // inputObservers: InputObserver[],
        // inputObserver: InputObserver,
      }) => {
        sendEvent({
          type: 'NotifyObservers',
          items,
          // inputObservers
        });
      }
    );

    const executor = app!.getExecutor({
      diagram,
      storage,
      inputObserverController,
      inputObserverControllerMock
    });

    try {
      const execution = executor?.execute();

      for await(const executionUpdate of execution) {
        sendEvent({
          ...executionUpdate,
          type: 'LinkCountsObserver'
        })
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

  const LinkCountsObserver = ({ data, sendEvent }: HandlerParam) => {
    console.log('LinkCountsObserver', data);
  }

  const ItemsObserver = ({ data, sendEvent }: HandlerParam) => {
    inputObserverControllerMock.pushExecutionObserver({
      ...data as ItemsObserver,
      onReceive: (items: ItemValue[], inputObserver: InputObserver) => {
        sendEvent({
          items,
          inputObserver,
          type: RequestObserverType.ItemsObserver
        })
      }
    } as ItemsObserver);

    console.log('ItemsObserver', data as ItemsObserver);
  }

  const NotifyDataUpdate = ({ data, sendEvent }: HandlerParam) => {
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
    LinkCountsObserver,
    ItemsObserver,
    NotifyDataUpdate
  }
}
