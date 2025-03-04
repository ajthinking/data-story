import * as vscode from 'vscode';
import { Diagram, InMemoryStorage } from '@data-story/core';
import { MessageHandler } from '../MessageHandler';
import { createAndBootApp } from '../app/createAndBootApp';
import { abortControllers } from './abortRun';
import { abortControllers } from './onAbort';
import { loadWorkspaceEnv } from '../utils/loadWorkspaceEnv';

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
  // Load latest .env file contents before running
  const envVars = loadWorkspaceEnv();

  const app = await createAndBootApp();

  const diagram = new Diagram({
    nodes: event.diagram.nodes,
    links: event.diagram.links,
  });
  const msgId = event.msgId;

  setWorkspaceFolderPath();
  const executionId = event.executionId;
  const controller = new AbortController();
  abortControllers.set(executionId, controller);

  // 移除setTimeout自动abort，改由外部控制
  const abortSignal = controller.signal;
  const executor = app.getExecutor({
    diagram,
    storage: new InMemoryStorage(),
    inputObserverController,
  });

  const startTime = Date.now();
  console.log('[data-story:] onRun startTime', startTime);
  const execution = executor.execute(abortSignal);

  try {
    for await(const update of execution) {}

    const endTime = Date.now();
    console.log('[data-story:] onRun endTime', endTime);
    postMessage?.({
      msgId,
      type: 'ExecutionResult',
      time: endTime - startTime,
    });
  } catch(error: any) {
    postMessage?.({
      msgId,
      type: 'ExecutionFailure',
      error: error.message,
    });

    console.log('Error in onRun!');
    console.error(error);
  } finally {
    abortControllers.delete(executionId);
  }
};
