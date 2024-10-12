import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Observable, retry } from 'rxjs';
import { createTransport, TransportConfig } from './createTransport';
import { WorkspaceApiClient } from './WorkspaceApiClient';
import { WorkspaceApiClientBaseV2 } from './WorkspaceApiClientBaseV1';

function createSocketTransport(socket: WebSocketSubject<any>) {
  const maxReconnectTries = 100;
  const reconnectTimeoutMs = 1000;
  const config: TransportConfig = {
    postMessage: (msg) => {
      socket.next(msg)
    },
    messages$: new Observable<{msgId: string; [p: string]: unknown}>((subscriber) => {
      socket.pipe(
        retry({ count: maxReconnectTries, delay: reconnectTimeoutMs }),
      ).subscribe({
        next: (message) => {
          subscriber.next(message);
        },
        error: (err) => console.log('WebSocket error: ', err),
      });
    })
  }
  return createTransport(config);
}

export const createSocketClient = (): WorkspaceApiClient => {
  const socket$ = webSocket({
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
  const transport = createSocketTransport(socket$);
  return new WorkspaceApiClientBaseV2(transport);
}
