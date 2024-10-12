import { Observable } from 'rxjs';
import { createTransport, type TransportConfig, type WorkspaceApiClient, WorkspaceApiClientBaseV2 } from '@data-story/ui';

function createVsCodeTransport(vscode: any) {
  const config: TransportConfig = {
    postMessage: (msg) => {
      vscode.postMessage(msg);
    },
    messages$: new Observable<{msgId: string; [p: string]: unknown}>((subscriber) => {
      window.addEventListener('message', (event) => {
        if (event.data.msgId) {
          subscriber.next(event.data);
        }
      });
    })
  };
  return createTransport(config);
}

export const createVsCodeClient = (vscode: any): WorkspaceApiClient => {
  const transport = createVsCodeTransport(vscode);
  return new WorkspaceApiClientBaseV2(transport);
};
