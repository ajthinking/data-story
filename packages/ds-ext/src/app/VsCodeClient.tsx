import { createDataStoryId, Hook } from '@data-story/core';
import { DataStoryEvents, eventManager } from '@data-story/ui';
import type { WorkspaceApiClient, ClientRunParams, ServerClientObservationConfig } from '@data-story/ui';

export class VsCodeClient implements WorkspaceApiClient {
  updateEdgeCounts: any;
  private vscode: any;
  private observers: ServerClientObservationConfig | undefined;

  constructor(vscode: any) {
    this.vscode = vscode;

    window.addEventListener('message', (event) => this.handleMessage(event.data));
    this.run = this.run.bind(this);
  }

  async getNodeDescriptions() {
    const { availableNodes } = await this.sendAwaitable({ type: 'getNodeDescriptions' });

    return availableNodes;
  }

  async run ({ diagram, updateEdgeCounts, observers }: ClientRunParams): Promise<void> {
    this.observers = observers;
    this.updateEdgeCounts = updateEdgeCounts;
    const message = {
      type: 'run',
      diagram,
      inputObservers: observers?.inputObservers || [],
    };

    eventManager.emit({
      type: DataStoryEvents.RUN_START
    });

    this.sendMessage(message);
  }

  async getTree() {}
  async createTree() {}
  async updateTree() {}
  async destroyTree() {}
  async moveTree() {}

  private sendMessage(message: any) {
    this.vscode.postMessage(message);
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
    };

    this.sendMessage(awaitableMessage);
    // Wait for response and return it in an awaitable way!
    const result = await waitForResponse(awaitableMessage);
    return result;
  }

  private handleMessage(data: any) {
    processWaitingResponse(data);

    if (data.awaited) {return;}

    // ...If message is non-transactional, handle it
    if (data.type === 'ExecutionUpdate') {
      this.updateEdgeCounts!(data.counts);

      for(const hook of data.hooks as Hook[]) {
        if (hook.type === 'CONSOLE_LOG') {
          console.log(...hook.args);
        } else if (hook.type === 'UPDATES') {
          const providedCallback = (...data: any) => {
            console.log('THIS IS THE UPDATE HOOK!');
            console.log('DataPassed', data);
          };

          providedCallback(...hook.args);
        }
      }
      return;
    }

    if (data.type === 'NotifyObservers') {
      this?.observers?.onDataChange(data.items, data.inputObservers);
      return;
    }

    if (data.type === 'ExecutionResult') {
      console.log('Execution complete 💫');
      eventManager.emit({
        type: DataStoryEvents.RUN_SUCCESS,
        payload: data,
      });
      return;
    }

    if (data.type === 'ExecutionFailure') {
      console.error('Execution failed: ', {
        history: data.history,
      });

      eventManager.emit({
        type: DataStoryEvents.RUN_ERROR,
        payload: data
      });

      return;
    }

    if (data.type === 'UpdateStorage') {
      return;
    }

    throw ('Unknown message type (client): ' + JSON.stringify(data));
  }
}

const pendingResponses: Map<string, {resolve: Function; reject: Function}> = new Map();

export const processWaitingResponse = (message: any) => {
  const response: any = message;

  // check if there is a response pending for this id
  const pending = pendingResponses.get(response.id);
  if (pending) {
    pending.resolve(response);
    pendingResponses.delete(response.id);
  }
};

// send a message and wait for the response
export async function waitForResponse(params: any): Promise<any> {
  const { id } = params;

  return new Promise((resolve, reject) => {
    pendingResponses.set(id, { resolve, reject });

    // config 10s timeout for the rejection
    setTimeout(() => {
      if (pendingResponses.has(id)) {
        pendingResponses.delete(id);
        reject(new Error('Request timed out'));
      }
    }, 10000);
  });
}
