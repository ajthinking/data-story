import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Observable, retry } from 'rxjs';
import { WorkspaceApiClientBase } from './WorkspaceApiClientBase';

export class WorkspaceSocketClient extends WorkspaceApiClientBase {
  private socket$: WebSocketSubject<any> | undefined;
  private wsObservable: Observable<any> | undefined;
  private maxReconnectTries = 100;
  private reconnectTimeoutMs = 1000;

  constructor() {
    super();
  }

  initialize(): void {
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
  }

  sendMessage(message: any) {
    this.socket$!.next(message);
  }

}
