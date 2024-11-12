import {
  Application,
  Diagram,
  ExecutionFailure,
  InMemoryStorage,
  type InputObserver,
  InputObserverController,
  type ItemValue
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

export const getDefaultMsgHandlers = (app: Application) => {
  const run = async({ data, sendEvent }: HandlerParam) => {
    const storage = new InMemoryStorage();
    const { diagram, inputObservers } = data as RunMessage;

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
        sendEvent({
          // todo: linkInfo 展开
          // linkIds: executionUpdate.counts.keys(),
          // linksInfo: Object.keys(executionUpdate.counts).map((key) => {
          //   return {
          //     linkId: key,
          //     count: executionUpdate.counts[key]
          //   }
          // }),
          counts: executionUpdate.counts,
          hooks: executionUpdate.hooks,
          edgeStatus: 'running',
          type: 'LinkCountsObserver'
        })
        sendEvent(executionUpdate);
      }

      sendEvent({
        counts: Object.fromEntries(executor.memory.getLinkCounts().entries()),
        edgeStatus: 'complete',
        type: 'LinkCountsObserver'
      });
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
    getDiagram
  }
}
