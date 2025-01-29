import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Observable, retry, share } from 'rxjs';
import { createTransport, TransportConfig } from './createTransport';
import { WorkspaceApiClientImplement } from './WorkspaceApiClientImplement';
import { WorkspaceApiClient } from './WorkspaceApiClient';

function createSocketTransport(socket: WebSocketSubject<any>) {
  const maxReconnectTries = 100;
  const reconnectTimeoutMs = 1000;
  let messages$: Observable<{ msgId: string; [p: string]: unknown }> = socket.pipe(
    retry({ count: maxReconnectTries, delay: reconnectTimeoutMs }),
    share(),
  );
  const config: TransportConfig = {
    postMessage: (msg) => {
      socket.next(msg);
    },
    messages$: messages$,
  }
  return createTransport(config);
}

export const createSocketClient = (): {
  client: WorkspaceApiClientImplement,
  dispose: () => void
} => {
  const socket$ = webSocket({
    url: 'ws://localhost:3300',
    openObserver: {
      next: () => {
        console.log(`Connected to server: ${'ws://localhost:3300'}`);
      },
    },
    closeObserver: {
      next: () => {
        console.log('WebSocket closed.');
      },
    },
  });

  const socketKeepAlive = socket$.subscribe();

  const transport = createSocketTransport(socket$);
  return {
    client: new WorkspaceApiClient(transport),
    dispose: () => {
      socketKeepAlive.unsubscribe();
      socket$.complete();
    },
  }
}
