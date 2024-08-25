import { Diagram, NodeDescription, Tree } from '@data-story/core';
import { WorkspacesApi } from './WorkspacesApi';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Observable, retry } from 'rxjs';

export class WorkspaceSocketClient {
  protected socket$: WebSocketSubject<any>;
  protected wsObservable: Observable<any>;
  protected maxReconnectTries = 100;
  protected reconnectTimeoutMs = 1000;

  constructor() {
    this.socket$ = webSocket({
      url: 'localhost:3000',
      openObserver: {
        next: () => {
          console.log(`Connected to server: ${'localhost:3000'}`);
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

  workspacesApi: WorkspacesApi = {
    getNodeDescriptions: async({ path }) => {
      console.log('Getting node descriptions from WorkspaceSocketClient')
      return [] as NodeDescription[]
    },

    getTree: async({ path }) => {
      console.log('Getting tree from WorkspaceSocketClient')
      const defaultTree = [
        {
          path: '/',
          type: 'folder',
          name: '/',
          id: 'root',
          children: [
            {
              name: 'main',
              id: 'main',
              path: '/main',
              type: 'file',
              content: new Diagram(),
            },
            {
              name: 'dev',
              id: 'dev',
              path: '/dev',
              type: 'file',
              content: new Diagram(),
            }
          ],
        },
        {
          path: '/branch',
          type: 'file',
          id: 'branch',
          name: 'branch',
          content: new Diagram(),
        }
      ];
      return defaultTree
    },
  } as WorkspacesApi
}