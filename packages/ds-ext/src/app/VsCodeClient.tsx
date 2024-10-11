import { Diagram } from '@data-story/core';
import { ClientRunParams, WorkspaceApiClientBase } from '@data-story/ui';

export const fileUri = window.initialData.fileUri;

export class VsCodeClient extends WorkspaceApiClientBase {
  private vscode: any;

  constructor(vscode: any) {
    super();
    this.vscode = vscode;
    this.updateTree = this.updateTree.bind(this);
  }

  initialize() {
    window.addEventListener('message', (event) => this.handleMessage(event.data));
  }

  async getNodeDescriptions() {
    const { availableNodes } = await this.sendAwaitable({ type: 'getNodeDescriptions' });

    return availableNodes ?? [];
  }

  async getTree() {
  }

  async createTree() {
  }

  async updateTree(diagram: Diagram) {
    const message = {
      type: 'updateDiagram',
      fileUri,
      diagram: JSON.stringify(diagram),
    };
    this.sendMessage(message);
  }

  async destroyTree() {
  }

  async moveTree() {
  }

  sendMessage(message: any) {
    this.vscode.postMessage(message);
  }
}
