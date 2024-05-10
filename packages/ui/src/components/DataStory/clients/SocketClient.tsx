import { createDataStoryId, Diagram, Hook } from '@data-story/core';
import { ServerClient } from './ServerClient';
import { eventManager } from '../events/eventManager';
import { DataStoryEvents } from '../events/dataStoryEventType';
import { catchError, filter, firstValueFrom, map, Observable, retry, timeout } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { ItemsOptions, ItemsResponse } from './ItemsApi';
import { ServerClientObservationConfig, SocketClientOptions } from '../types';
import { clientBuffer } from './ClientBuffer';

export class SocketClient implements ServerClient {
  protected socket$: WebSocketSubject<any>;
  protected wsObservable: Observable<any>;
  protected maxReconnectTries = 100;
  protected reconnectTimeoutMs = 1000;
  private setAvailableNodes: SocketClientOptions['setAvailableNodes'];
  private updateEdgeCounts: SocketClientOptions['updateEdgeCounts'];

  constructor({
    setAvailableNodes,
    updateEdgeCounts,
    serverConfig,
  }:SocketClientOptions) {
    this.setAvailableNodes = setAvailableNodes;
    this.updateEdgeCounts = updateEdgeCounts;

    this.socket$ = webSocket({
      url: serverConfig.url,
      openObserver: {
        next: () => {
          console.log(`Connected to server: ${serverConfig.url}`);
          this.describe()
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
  }

  itemsApi = () => {
    return {
      getItems: ({
        atNodeId,
        limit = 10,
        offset = 0,
      }: ItemsOptions) => {
        const msgId = createDataStoryId();
        this.socketSendMsg({
          type: 'getItems',
          atNodeId,
          id: msgId,
          limit,
          offset,
        });

        return firstValueFrom(this.wsObservable.pipe(
          filter(message => message.type === 'UpdateStorage' && message.id === msgId),
          map(message => {
            return {
              items: message.items,
              total: message.total,
            } as ItemsResponse;
          }),
          // handle timeout and retry
          timeout(100000),
          retry({ count: 3, delay: this.reconnectTimeoutMs }),
          catchError((err) => {
            console.error('Error in getItems', err);
            throw err;
          })
        ))
      }
    }
  }

  init() {
    this.wsObservable.subscribe({
      next: (message) => this.handleMessage(message),
      // Called if at any point WebSocket API signals some kind of error
      error: (err) => console.log('WebSocket error: ', err),
    });
  }

  run(diagram: Diagram, observers?: ServerClientObservationConfig) {
    const message = {
      type: 'run',
      diagram,
      inputObservers: observers?.inputObservers || [],
    };

    this.socketSendMsg(message);
    eventManager.emit({
      type: DataStoryEvents.RUN_START
    });

    this.wsObservable.pipe(
      filter(data => data.type === 'NotifyObservers'),
      clientBuffer()
    ).forEach((data) => {
      observers?.onDataChange(
        data.items,
        data.inputObservers,
      );
    });
  }

  async save(name: string, diagram: Diagram) {
    const message = {
      type: 'save',
      name,
      diagram
    }

    this.socketSendMsg(message);
  }

  protected describe() {
    const message = {
      type: 'describe',
    }

    this.socketSendMsg(message);
  }

  private handleMessage(data: Record<string, any>) {
    if (!data) {
      return;
    }

    if (data.type === 'DescribeResponse') {
      this.setAvailableNodes(data.availableNodes)

      return;
    }

    if (data.type === 'ExecutionUpdate') {
      this.updateEdgeCounts(data.counts)

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

  private socketSendMsg(message: Record<string, unknown>) {
    this.socket$!.next(message);
  }

}
