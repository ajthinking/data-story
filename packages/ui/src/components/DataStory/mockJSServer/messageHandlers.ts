import {
  Application,
  Diagram,
  ExecutionFailure,
  type InputObserver,
  ObserverController,
  type ItemValue, RequestObserverType,
  type ObserveLinkItems, ObserveLinkCounts, ObserveLinkUpdate, GetDataFromStorageParams, LinkId, ObserveNodeStatus,
  CancelObservation,
} from '@data-story/core';
import { loadDiagram, saveDiagram } from './storeDiagram';

type RunMessage = {
  msgId: string,
  type: 'run',
  diagram: Diagram,
  inputObservers: InputObserver[],
  executionId: string,
}

export type HandlerParam = { data: unknown, sendEvent: (msg: Record<string, any>) => void };
export type Message = { type: string } & Record<string, unknown>;

type Handler = (params: HandlerParam) => Promise<unknown>;
export type MessageHandlers = {
  run: Handler,
  getNodeDescriptions: Handler,
  updateDiagram: Handler,
  [key: string]: Handler,
};
const LocalStorageKey = 'data-story-tree';

export const getDefaultMsgHandlers = (app: Application, observerController: ObserverController) => {
  const abortControllers = new Map<string, AbortController>();

  const abortExecution = async ({ data, sendEvent }: HandlerParam) => {
    const { executionId } = data as { executionId: string };
    const controller = abortControllers.get(executionId);
    if (controller) {
      controller.abort();
    }
  };

  const run = async({ data, sendEvent }: HandlerParam) => {
    const startTime = performance.now();
    const { diagram, executionId } = data as RunMessage;

    const executor = app!.getExecutor({
      diagram,
      observerController,
    });

    const controller = new AbortController();
    abortControllers.set(executionId, controller);
    const abortSignal = controller.signal;

    try {
      const execution = executor?.execute(abortSignal);
      for await(const executionUpdate of execution) {
      }

      const executionResult = {
        type: 'ExecutionResult',
        time: performance.now() - startTime,
      }
      sendEvent(executionResult);
    } catch(error: any) {
      // the execution is aborted
      if (error instanceof Error && error.message === 'Execution aborted') {
        sendEvent?.({
          type: 'ExecutionAborted',
          executionId,
        });
        return;
      }

      const failure: ExecutionFailure = {
        type: 'ExecutionFailure',
        message: error?.message,
      }
      sendEvent(failure);
    }
  };

  const observeLinkCounts = ({ data, sendEvent }: HandlerParam) => {
    observerController.addLinkCountsObserver({
      ...data as ObserveLinkCounts,
      onReceive: ({ links }) => {
        sendEvent({
          links: links,
          type: RequestObserverType.observeLinkCounts,
        })
      },
    })
  }

  const observeNodeStatus = ({ data, sendEvent }: HandlerParam) => {
    observerController.addNodeStatusObserver({
      ...data as ObserveNodeStatus,
      onReceive: ({ nodes }) => {
        sendEvent({
          nodes: nodes,
          type: RequestObserverType.observeNodeStatus,
        })
      },
    })
  }

  const observeLinkItems = ({ data, sendEvent }: HandlerParam) => {
    observerController.addLinkItemsObserver({
      ...data as ObserveLinkItems,
      onReceive: (items: ItemValue[], inputObserver: InputObserver) => {
        sendEvent({
          items,
          inputObserver,
          type: RequestObserverType.observeLinkItems,
        })
      },
    } as ObserveLinkItems);
  }

  const cancelObservation = ({ data, sendEvent }: HandlerParam) => {
    observerController.deleteExecutionObserver(data as CancelObservation);
    sendEvent({
      ...data as Record<string, unknown>,
      // cancelObservation: true
    });
  }

  const observeLinkUpdate = ({ data, sendEvent }: HandlerParam) => {
    observerController.observeLinkUpdate({
      ...data as ObserveLinkUpdate,
      onReceive: () => {
        sendEvent({
          linkIds: (data as ObserveLinkUpdate).linkIds,
          type: RequestObserverType.observeLinkUpdate,
        });
      },
    } as ObserveLinkUpdate);
  }

  const getNodeDescriptions = async({ data, sendEvent }: HandlerParam) => {
    const nodeDescriptions = app!.descriptions();
    setTimeout(() => {
      sendEvent({
        ...data as Record<string, unknown>,
        availableNodes: nodeDescriptions,
      });
    }, 1000);
  };

  const updateDiagram = async({ data, sendEvent }: HandlerParam) => {
    saveDiagram(LocalStorageKey, (data as { diagram: Diagram }).diagram);
  }

  const getDiagram = async({ data, sendEvent }: HandlerParam) => {
    const localDiagram = loadDiagram(LocalStorageKey);

    sendEvent({
      ...data as Record<string, unknown>,
      diagram: localDiagram.diagram,
    });
  };

  const getDataFromStorage = async({ data, sendEvent }: HandlerParam) => {
    const result: Record<LinkId, ItemValue[]> = await observerController.getDataFromStorage(data as GetDataFromStorageParams);

    sendEvent({
      ...data as GetDataFromStorageParams,
      data: result,
    });
  }

  return {
    abortExecution,
    run,
    getNodeDescriptions,
    updateDiagram,
    getDiagram,
    observeLinkCounts,
    observeLinkItems,
    observeLinkUpdate,
    cancelObservation,
    getDataFromStorage,
    observeNodeStatus,
  }
}
