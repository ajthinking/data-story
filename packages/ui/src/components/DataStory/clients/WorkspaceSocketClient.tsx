import { createDataStoryId, NodeDescription, Tree } from '@data-story/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { catchError, filter, firstValueFrom, Observable, retry, timeout } from 'rxjs';
import { ClientRunParams } from '../types';
import { WorkspaceApiClient } from './WorkspaceApiClient';

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
      next: (message) => this.handleMessage(message),
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
    console.log('Getting tree from WorkspaceSocketClient')
    const response = await this.sendAwaitable({
      type: 'getTree',
      path,
    }) as {tree: Tree[]};

    console.log('Got tree from WorkspaceSocketClient', response.tree)

    return response.tree
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

  private async sendAwaitable(message) {
    const msgId = createDataStoryId();
    message['id'] = msgId;
    message['awaited'] = true;

    console.log('Sending awaitable message', message);
    this.socketSendMsg(message);

    // Wait for response and return it in an awaitable way!
    return firstValueFrom(this.wsObservable.pipe(
      filter((msg: any) => msg.id === msgId),
      timeout(10000),
      catchError((err) => {
        console.error('Error in sendAwaitable', err);
        throw err;
      })
    ));
  }

  private handleMessage(data: Record<string, any>) {
    // If message is awaited, we expect user to handle at call site
    if (data.awaited) return;

    // ...If message is non-transactional, handle it
  }
}
