import * as vscode from 'vscode';
import { Diagram } from '@data-story/core';
import { MessageHandler } from '../MessageHandler';
import { createAndBootApp } from '../app/createAndBootApp';
import { abortControllers } from './abortExecution';
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
  setWorkspaceFolderPath();
  const { msgId, executionId } = event;

  const controller = new AbortController();
  abortControllers.set(executionId, controller);
  const abortSignal = controller.signal;

  const executor = app.getExecutor({
    diagram,
    inputObserverController,
  });

  const startTime = Date.now();
  const execution = executor.execute(abortSignal);

  try {
    for await(const _update of execution) {}

    const endTime = Date.now();
    postMessage?.({
      msgId,
      type: 'ExecutionResult',
      time: endTime - startTime,
    });
  } catch(error: any) {
    // the execution is aborted
    if (error instanceof Error && error.message === 'Execution aborted') {
      postMessage?.({
        msgId,
        type: 'ExecutionAborted',
        executionId,
      });
      return;
    }

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
