import { Observable } from 'rxjs';
import {
  createTransport,
  type TransportConfig,
  type WorkspaceApiClientImplement,
  WorkspaceApiClient,
  Transport,
} from '@data-story/ui';

function createVsCodeTransport(vscode: any) {
  const config: TransportConfig = {
    postMessage: (msg) => {
      vscode.postMessage(msg);
    },
    messages$: new Observable<{ msgId: string; [p: string]: unknown }>((subscriber) => {
      window.addEventListener('message', (event) => {
        if (event.data.msgId) {
          subscriber.next(event.data);
        }
      });
    }),
  };
  return createTransport(config);
}

export const createVsCodeClient = (vscode: any) => {
  const transport = createVsCodeTransport(vscode);
  return new VsCodeApiClient(transport);
};

class VsCodeApiClient {
  constructor(private transport: Transport) {
  }

  toast(message: string) {
    this.transport.sendAndReceive({
      type: 'toast',
      message,
    });
  }

  onEdgeDoubleClick(edgeId: string): void {
    console.log('sendAndReceive onEdgeDoubleClick', edgeId);
    this.transport.sendAndReceive({
      type: 'onEdgeDoubleClick',
      edgeId,
    });
  }
}