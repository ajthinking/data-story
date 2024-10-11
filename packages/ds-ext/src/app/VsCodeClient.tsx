import { createDataStoryId, Diagram, Hook } from '@data-story/core';
import { DataStoryEvents, eventManager, processWaitingResponse, waitForResponse } from '@data-story/ui';
import type { WorkspaceApiClient, ClientRunParams, ServerClientObservationConfig } from '@data-story/ui';

export const fileUri = window.initialData.fileUri;

export class VsCodeClient implements WorkspaceApiClient {
  updateEdgeCounts: any;
  private vscode: any;
  private observers: ServerClientObservationConfig | undefined;

  constructor(vscode: any) {
    this.vscode = vscode;

    window.addEventListener('message', (event) => this.handleMessage(event.data));
    this.run = this.run.bind(this);
    this.updateTree = this.updateTree.bind(this);
  }

  async getNodeDescriptions() {
    const { availableNodes } = await this.sendAwaitable({ type: 'getNodeDescriptions' });

    return availableNodes;
  }

  async run({ diagram, updateEdgeCounts, observers }: ClientRunParams): Promise<void> {
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

  async getTree() { }
  async createTree() { }

  async updateTree(diagram: Diagram) {
    const message = {
      type: 'updateDiagram',
      fileUri,
      diagram: JSON.stringify(diagram),
    };
    this.sendMessage(message);
  }

  async destroyTree() { }
  async moveTree() { }

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

    if (data.awaited) { return; }

    // ...If message is non-transactional, handle it
    if (data.type === 'ExecutionUpdate') {
      this.updateEdgeCounts!(data.counts);

      for (const hook of data.hooks as Hook[]) {
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
