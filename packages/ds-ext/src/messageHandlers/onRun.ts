import * as vscode from 'vscode';
import { Application, coreNodeProvider, Diagram, InMemoryStorage, ReportCallback } from '@data-story/core';
import { MessageHandler } from '../MessageHandler';
import { nodeJsProvider } from '@data-story/nodejs';
import { createAndBootApp } from '../app/createAndBootApp';

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

export const onRun: MessageHandler = async ({ event, postMessage, inputObserverController }) => {
  const app = await createAndBootApp();

  const diagram = new Diagram({
    nodes: event.diagram.nodes,
    links: event.diagram.links,
  });
  const msgId = event.msgId;

  setWorkspaceFolderPath();

  const executor = app.getExecutor({
    diagram,
    storage: new InMemoryStorage(),
    inputObserverController
  });

  const startTime = Date.now();
  const execution = executor.execute();

  try {
    for await(const update of execution) {}

    const endTime = Date.now();
    postMessage({
      msgId,
      type: 'ExecutionResult',
      time: endTime - startTime
    });
  } catch(error: any) {
    postMessage({
      msgId,
      type: 'ExecutionFailure',
      error: error.message
    });

    console.log('Error in onRun!');
    console.error(error);
  }
};