import { createDataStoryId, Hook, NodeDescription } from '@data-story/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { filter, Observable, retry } from 'rxjs';
import { ClientRunParams, DescribeResponse, ServerClientObservationConfig } from '../types';
import { WorkspaceApiClient } from './WorkspaceApiClient';
import { processWaitingResponse, waitForResponse } from './WebSocketHandleResponseMiddleware';
import { DataStoryEvents } from '../events/dataStoryEventType';
import { eventManager } from '../events/eventManager';
import { clientBuffer } from './ClientBuffer';

export class WorkspaceSocketClient implements WorkspaceApiClient {
  private socket$: WebSocketSubject<any>;
  private wsObservable: Observable<any>;
  private maxReconnectTries = 100;
  private reconnectTimeoutMs = 1000;
  private updateEdgeCounts?: ClientRunParams['updateEdgeCounts'];
  private observers: ServerClientObservationConfig | undefined;

  constructor() {
    this.socket$ = webSocket({
      url: 'ws://localhost:3300',
      openObserver: {
        next: () => {
          console.log(`Connected to server: ${'ws://localhost:3300'}`);
        }
      },
      closeObserver: {
        next: () => {
          console.log('WebSocket closed.');
        }
      }
    });

    this.wsObservable = this.socket$.pipe(
      retry({ count: this.maxReconnectTries, delay: this.reconnectTimeoutMs }),
    )

    this.wsObservable.subscribe({
      next: (message) => {
        this.handleMessage(message);
      },
      // Called if at any point WebSocket API signals some kind of error
      error: (err) => console.log('WebSocket error: ', err),
    });

    this.wsObservable.pipe(
      filter(data => data.type === 'NotifyObservers'),
      clientBuffer()
    ).subscribe((data) => {
      console.log('workspaceSocketClient: NotifyObservers', data);
      this?.observers?.onDataChange(
        data.items,
        data.inputObservers,
      );
    });

    this.run = this.run.bind(this);
  }

  run (
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

    this.socketSendMsg(message);
  }

  async getNodeDescriptions({ path }) {
    const response = await this.sendAwaitable({
      type: 'describe',
      path,
    }) as DescribeResponse;

    return response.availableNodes ?? [] as NodeDescription[]
  }

  private socketSendMsg(message: any) {
    this.socket$!.next(message);
  }

  private async sendAwaitable(message: {
    type: string,
    [key: string]: any,
  }) {
    const msgId = createDataStoryId();
    const awaitableMessage = {
      ...message,
      id: msgId,
      awaited: true,
    } as any;

    this.socketSendMsg(awaitableMessage);
    // Wait for response and return it in an awaitable way!
    const result = await waitForResponse(awaitableMessage);
    return result;
  }

  private handleMessage(data: any) {
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

    if (data.type === 'ExecutionResult') {
      console.log('Execution complete 💫')
      eventManager.emit({
        type: DataStoryEvents.RUN_SUCCESS
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

    if (data.type === 'UpdateStorage' || data.type === 'NotifyObservers') {
      return;
    }

    throw ('Unknown message type (client): ' + data.type)
  }
}
