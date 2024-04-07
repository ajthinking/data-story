import { createDataStoryId, Diagram, NodeDescription } from '@data-story/core';
import { ServerClient } from './ServerClient';
import { Hook } from '@data-story/core';
import { eventManager } from '../events/eventManager';
import { DataStoryEvents } from '../events/dataStoryEventType';
import { delayWhen, Observable, retryWhen, Subject, takeUntil, timer } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

export class SocketClient implements ServerClient {
  protected socket?: WebSocket;
  protected socket$?: WebSocketSubject<any>;
  protected disconnect$ = new Subject<void>();

  protected maxReconnectTries = 100;
  protected reconnectTimeout = 1000;
  protected reconnectTries = 0;

  /**
   * todo: 1. 检查是否有误 运行内容是否正确
   * 2. 运行失败
   *
   */
  constructor(
    protected setAvailableNodes: (nodes: NodeDescription[]) => void,
    protected updateEdgeCounts: (edgeCounts: Record<string, number>) => void,
  ) {
    // @ts-ignore
    this.socket$ = new webSocket({
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
          // const msgId = createDataStoryId();
          this.socketSendMsg({
            type: 'getItems',
            atNodeId,
          });

          this.socket$?.pipe()
            .subscribe({
              next: (data: Record<string, any>) => {
                console.log('Data', data);
                console.log('sendMsg', {
                  type: 'getItems',
                  atNodeId,
                })
                if (data.type === 'UpdateStorage') {
                  const { nodeId, items, id } = data

                  if (nodeId === atNodeId) {
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
    // 把 this.socket 封装成 一个 rxjs 的 observable

    this.socket$!.pipe(
      takeUntil(this.disconnect$),
      retryWhen(errors =>
        errors.pipe(
          delayWhen(() => timer(this.reconnectTimeout)),
          takeUntil(this.disconnect$)
        )
      )
    ).subscribe({
      next: (message) => this.handleMessage(message),
      error: (err) => console.log('WebSocket error: ', err),
    });

    // this.socket = new WebSocket('ws://localhost:3110')
    //
    // // Register on open
    // this.socket.onopen = () => {
    //   console.log('Connected to server: localhost:3110');
    //
    //   // Ask the server to describe capabilites
    //   this.describe()
    // };
    //
    // // Register on error
    // this.socket.onerror = (error) => {
    //   console.log('WebSocket error: ', error);
    // };
    //
    // // Register on close
    // this.socket.onclose = () => {
    //   console.log('WebSocket closed.');
    //
    //   if (this.reconnectTries < this.maxReconnectTries) {
    //     setTimeout(() => {
    //       console.log('Reconnecting...');
    //       this.reconnectTries++;
    //       this.init();
    //     }, this.reconnectTimeout);
    //   } else {
    //     console.log('Max reconnect tries reached. Is the server running?');
    //   }
    // };
    //
    // this.socket.onmessage = this.handleMessage;
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
