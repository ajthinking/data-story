import { createDataStoryId, NodeDescription, Tree } from '@data-story/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Observable, retry } from 'rxjs';
import { ClientRunParams, DescribeResponse, GetTreeResponse, TreeMessage, TreeResponse } from '../types';
import { WorkspaceApiClient } from './WorkspaceApiClient';
import { processWaitingResponse, waitForResponse } from './WebSocketHandleResponseMiddleware';

export class WorkspaceSocketClient implements WorkspaceApiClient {
  private socket$: WebSocketSubject<any>;
  private wsObservable: Observable<any>;
  private maxReconnectTries = 100;
  private reconnectTimeoutMs = 1000;

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

    // this.wsObservable.pipe(
    //   filter(data => data.type === 'NotifyObservers'),
    //   clientBuffer()
    // ).subscribe((data) => {
    //   this?.observers?.onDataChange(
    //     data.items,
    //     data.inputObservers,
    //   );
    // });
  }

  run = (
    { updateEdgeCounts, diagram, observers }: ClientRunParams
  ) => {
  }

  async getTree({ path }: {path: string}) {
    const response = await this.sendAwaitable({
      type: 'getTree',
      path,
    }) as GetTreeResponse;

    return response.tree;
  }

  async createTree() {
    console.log('Creating tree from WorkspaceSocketClient')
    return [] as Tree[]
  }

  async updateTree() {
    console.log('Updating tree from WorkspaceSocketClient')
    return [] as Tree[]
  }

  async destroyTree() {
    console.log('Destroying tree from WorkspaceSocketClient')
  }

  async moveTree() {
    console.log('Moving tree from WorkspaceSocketClient')
    return [] as Tree[]
  }

  async getNodeDescriptions({ path }) {
    const response = await this.sendAwaitable({
      type: 'describe',
      path,
    }) as DescribeResponse;

    console.log('Getting node descriptions from WorkspaceSocketClient', response)
    return response.availableNodes ?? [] as NodeDescription[]
  }

  private socketSendMsg(message: TreeMessage) {
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
    } as TreeMessage;

    this.socketSendMsg(awaitableMessage);
    // Wait for response and return it in an awaitable way!
    const result = await waitForResponse(awaitableMessage);
    return result;
  }

  private handleMessage(data: TreeResponse) {
    processWaitingResponse(data);

    if (data.awaited) return;

    // ...If message is non-transactional, handle it
  }
}
