import { createDataStoryId, NodeDescription, Tree } from '@data-story/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { catchError, filter, firstValueFrom, Observable, retry, timeout } from 'rxjs';
import { ClientRunParams } from '../types';
import { WorkspaceApiClient } from './WorkspaceApiClient';
import { initListener, sendRequest } from './WSMiddleware';
export type GetTreeMessage = {
  id: string,
  awaited: boolean,
  type: 'getTree',
  path: string,
}

export type GetTreeResponse = {
  id: string,
  awaited: boolean,
  type: 'GetTreeResponse',
  tree: Tree[],
}
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
        initListener(message);
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

  // getTree: ({ path }) => Promise<Tree[]>
  // createTree: ({ path, tree }: { path: string, tree: Tree }) => Promise<Tree>;
  // updateTree: ({ path, tree }: { path: string, tree: Tree }) => Promise<Tree>
  // destroyTree: ({ path }: { path: string }) => Promise<void>
  // moveTree: ({ path, newPath }: { path: string, newPath: string}) => Promise<Tree>

  async getTree({ path }: {path: string}) {
    const response = await this.sendAwaitable({
      type: 'getTree',
      path,
    }) as  GetTreeResponse;

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
    console.log('Getting node descriptions from WorkspaceSocketClient')
    return [] as NodeDescription[]
  }

  private socketSendMsg(message: Record<string, unknown>) {
    this.socket$!.next(message);
  }

  private async sendAwaitable(message: Pick<GetTreeMessage, 'path' | 'type'>) {
    const msgId = createDataStoryId();
    const newMessage = {
      ...message,
      id: msgId,
      awaited: true,
    }

    // this.socketSendMsg(message);

    const result = await sendRequest(this.socket$, newMessage);
    // Wait for response and return it in an awaitable way!
    return result;
  }

  private handleMessage(data: Record<string, any>) {
    // console.log('Handling message', data);
    // If message is awaited, we expect user to handle at call site
    if (data.awaited) return;

    // ...If message is non-transactional, handle it
  }
}
