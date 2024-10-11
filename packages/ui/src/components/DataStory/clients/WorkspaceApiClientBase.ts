import { WorkspaceApiClient } from './WorkspaceApiClient';
import { ClientRunParams, DescribeResponse, ServerClientObservationConfig } from '../types';
import { createDataStoryId, Hook, NodeDescription } from '@data-story/core';
import { processWaitingResponse, waitForResponse } from './WebSocketHandleResponseMiddleware';
import { eventManager } from '../events/eventManager';
import { DataStoryEvents } from '../events/dataStoryEventType';

export abstract class WorkspaceApiClientBase {
  private updateEdgeCounts?: ClientRunParams['updateEdgeCounts'];
  private observers: ServerClientObservationConfig | undefined;

  protected constructor() {
    this.initialize();
    this.run = this.run.bind(this);
  }

  abstract sendMessage(message: any): void;
  abstract initialize(): void;
  // abstract run(params: ClientRunParams): void;

  async getNodeDescriptions() {
    const response = await this.sendAwaitable({
      type: 'describe',
    }) as DescribeResponse;

    return response.availableNodes ?? [] as NodeDescription[]
  }

  run(
    { updateEdgeCounts, diagram, observers }: ClientRunParams
  ) {
    this.observers = observers;
    this.updateEdgeCounts = updateEdgeCounts;
    const message = {
      type: 'run',
      diagram,
      inputObservers: observers?.inputObservers || [],
    };

    eventManager.emit({
      type: DataStoryEvents.RUN_START
    });
    this.sendMessage(message);
  }

  handleMessage(data: any) {
    processWaitingResponse(data);

    if (data.awaited) return;

    // ...If message is non-transactional, handle it
    if (data.type === 'ExecutionUpdate') {
      this.updateEdgeCounts!(data.counts)

      for(const hook of data.hooks as Hook[]) {
        if (hook.type === 'CONSOLE_LOG') {
          console.log(...hook.args)
        } else if (hook.type === 'UPDATES') {
          const providedCallback = (...data: any) => {
            console.log('THIS IS THE UPDATE HOOK!')
            console.log('DataPassed', data)
          }

          providedCallback(...hook.args)
        }
      }
      return;
    }

    if (data.type === 'NotifyObservers') {
      this?.observers?.onDataChange(
        data.items,
        data.inputObservers,
      );
      return;
    }

    if (data.type === 'ExecutionResult') {
      console.log('Execution complete 💫')
      eventManager.emit({
        type: DataStoryEvents.RUN_SUCCESS,
        payload: data
      });
      return
    }

    if (data.type === 'ExecutionFailure') {
      console.error('Execution failed: ', {
        history: data.history,
      })

      eventManager.emit({
        type: DataStoryEvents.RUN_ERROR,
        payload: data
      });

      return
    }

    if (data.type === 'UpdateStorage') {
      return;
    }

    throw ('Unknown message type (client): ' + data.type)
  }

  protected async sendAwaitable(message: {
    type: string,
    [key: string]: any,
  }) {
    const msgId = createDataStoryId();
    const awaitableMessage = {
      ...message,
      id: msgId,
      awaited: true,
    } as any;

    this.sendMessage(awaitableMessage);
    // Wait for response and return it in an awaitable way!
    const result = await waitForResponse(awaitableMessage);
    return result;
  }
}
