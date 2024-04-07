import { createDataStoryId, Diagram, NodeDescription } from '@data-story/core';
import { ServerClient } from './ServerClient';
import { Hook } from '@data-story/core';
import { eventManager } from '../events/eventManager';
import { DataStoryEvents } from '../events/dataStoryEventType';
import { delayWhen, Observable, retry, retryWhen, Subject, takeUntil, timer } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

export class SocketClient implements ServerClient {
  protected socket$?: WebSocketSubject<any>;
  protected maxReconnectTries = 100;
  protected reconnectTimeout = 1000;
  protected reconnectTries = 0;

  constructor(
    protected setAvailableNodes: (nodes: NodeDescription[]) => void,
    protected updateEdgeCounts: (edgeCounts: Record<string, number>) => void,
  ) {
    this.socket$ = webSocket({
      url: 'ws://localhost:3100',
      openObserver: {
        next: () => {
          console.log('Connected to server: localhost:3100');
          this.describe()
        }
      },
      closeObserver: {
        next: () => {
          console.log('WebSocket closed.');
          if (this.reconnectTries < this.maxReconnectTries) {
            setTimeout(() => {
              console.log('Reconnecting...');
              this.reconnectTries++;
              this.init();
            }, this.reconnectTimeout);
          } else {
            console.log('Max reconnect tries reached. Is the server running?');
          }
        }
      }
    });
  }

  itemsApi = () => {
    return {
      getItems: async ({
        atNodeId,
        limit = 10,
        offset = 0,
      }: {
        atNodeId: string,
        limit?: number,
        offset?: number,

      }) => {
        const promise = new Promise((resolve, reject) => {
          const msgId = createDataStoryId();
          this.socketSendMsg({
            type: 'getItems',
            atNodeId,
            id: msgId,
          });

          this.socket$?.pipe()
            .subscribe({
              next: (data: Record<string, any>) => {
                console.log('Data', data);
                console.log('sendMsg', {
                  type: 'getItems',
                  atNodeId,
                  id: msgId,
                })
                if (data.type === 'UpdateStorage') {
                  const { nodeId, items, id } = data

                  if (nodeId === atNodeId && id === msgId) {
                    resolve(items);
                  }
                }
              },
              error: (err) => {
                console.error('WebSocket error: ', err)
              }
            })
        });

        const items = await promise as Record<string, unknown>[];
        return items.slice(offset, offset + limit);
      }
    }
  }

  init() {
    this.socket$!.pipe(
      retry({count: this.maxReconnectTries, delay: this.reconnectTimeout})
    ).subscribe({
      next: (message) => this.handleMessage(message),
      error: (err) => console.log('WebSocket error: ', err),
    });
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

    if (data.type === 'UpdateStorage') {
      return;
    }
    throw ('Unknown message type (client): ' + data.type)
  }

  private socketSendMsg(message: Record<string,unknown>) {
    this.socket$!.next(message);
  }

  run(diagram: Diagram) {
    const message = {
      type: 'run',
      diagram,
    };

    this.socketSendMsg(message);
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
}
