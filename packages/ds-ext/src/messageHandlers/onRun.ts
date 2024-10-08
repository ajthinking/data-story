import * as vscode from 'vscode';
import { Application, coreNodeProvider, Diagram, ExecutionResult, InMemoryStorage, InputObserverController, ReportCallback } from '@data-story/core';
import { MessageHandler } from '../MessageHandler';
import { nodeJsProvider } from '@data-story/nodejs';

/**
 * Set the workspace folder path in `process.env.WORKSPACE_FOLDER_PATH`
 */
function setWorkspaceFolderPath() {
  // check if there is a workspace folder open
  if (vscode.workspace.workspaceFolders && vscode.workspace.workspaceFolders.length > 0) {
    // Get the path of the first workspace folder
    const workspaceFolder = vscode.workspace.workspaceFolders[0];
    const workspaceFolderPath = workspaceFolder.uri.fsPath;

    process.env.WORKSPACE_FOLDER_PATH = workspaceFolderPath;
  } else {
    // No workspace folder is open
    vscode.window.showInformationMessage('No workspace folder is open.');
  }
}

export const onRun: MessageHandler = async ({ event, webviewPanel }) => {
  const app = new Application();
  app.register([
    coreNodeProvider,
    nodeJsProvider,
  ]);

  await app.boot();

  const storage = new InMemoryStorage();

  const diagram = new Diagram({
    nodes: event.diagram.nodes,
    links: event.diagram.links,
  });

  const sendMsg: ReportCallback = (items, inputObservers) => {
    webviewPanel.webview.postMessage({
      type: 'NotifyObservers',
      inputObservers,
      items
    });
  };

  const inputObserverController = new InputObserverController(
    event.inputObservers || [],
    sendMsg
  );

  setWorkspaceFolderPath();

  const executor = app.getExecutor({
    diagram,
    storage: new InMemoryStorage(),
    inputObserverController
  });

  const startTime = Date.now();
  const execution = executor.execute();

  try {
    for await(const update of execution) {
      webviewPanel.webview.postMessage(update);
    }

    const endTime = Date.now();
    webviewPanel.webview.postMessage({
      type: 'ExecutionResult',
      time: endTime - startTime
    });
  } catch(error: any) {
    webviewPanel.webview.postMessage({
      type: 'ExecutionFailure',
      error: error.message
    });

    console.log('Error in onRun!');
    console.error(error);
  }
};