import { createDataStoryId, Hook } from '@data-story/core';
import { DataStoryEvents, eventManager } from '@data-story/ui';
// @ts-ignore
import { WorkspaceApiClient } from '@data-story/ui/dist/src/components/DataStory/clients/WorkspaceApiClient';
// @ts-ignore
import { ClientRunParams } from '@data-story/ui/dist/src/components/DataStory/types';

export class VsCodeClient implements WorkspaceApiClient {
  updateEdgeCounts: any;
  private vscode: any;

  constructor(vscode: any) {
    this.vscode = vscode;

    window.addEventListener('message', (event) => this.handleMessage(event.data));
  }

  async getNodeDescriptions() {
    const { availableNodes } = await this.sendAwaitable({ type: 'getNodeDescriptions' });

    return availableNodes;
  }

  run = async ({ diagram, updateEdgeCounts, observers }: ClientRunParams): Promise<void> => {
    this.updateEdgeCounts = updateEdgeCounts;
    const message = {
      type: 'run',
      diagram,
      inputObservers: observers?.inputObservers || [],
    };

    this.sendMessage(message);
  }

  getTree = (async () => {}) as any;
  createTree = (async () => {}) as any;
  updateTree = (async () => {}) as any;
  destroyTree = (async () => {}) as any;
  moveTree = (async () => {}) as any;

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

    if (data.awaited) return;

    // ...If message is non-transactional, handle it
    if (data.type === 'ExecutionUpdate') {
      this.updateEdgeCounts!(data.counts)

      for(const hook of data.hooks as Hook[]) {
        if (hook.type === 'CONSOLE_LOG') {
          console.log(...hook.args)
        } else if (hook.type === 'UPDATES') {
          const providedCallback = (...data: any) => {
            console.log('THIS IS THE UPDATE HOOK!')
            console.log('DataPassed', data)
          }

          providedCallback(...hook.args)
        }
      }
      return;
    }

    if (data.type === 'ExecutionResult') {
      console.log('Execution complete 💫')
      eventManager.emit({
        type: DataStoryEvents.RUN_SUCCESS
      });
      return
    }

    if (data.type === 'ExecutionFailure') {
      console.error('Execution failed: ', {
        history: data.history,
      })

      eventManager.emit({
        type: DataStoryEvents.RUN_ERROR,
        payload: data
      });

      return
    }

    if (data.type === 'UpdateStorage' || data.type === 'NotifyObservers') {
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
}

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