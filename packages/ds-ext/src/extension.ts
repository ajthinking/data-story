import * as vscode from 'vscode';
import { DiagramEditorProvider } from './DiagramEditorProvider';
import { JsonReadonlyProvider } from './JsonReadonlyProvider';
import { loadWorkspaceEnv } from './utils/loadWorkspaceEnv';

import { ServerLauncher } from './serverLauncher';
import { registerDataStoryCommands } from './vscode-commands';

// --- Global Variables ---
let diagramEditorProvider: DiagramEditorProvider;
let jsonReadonlyProvider: JsonReadonlyProvider | undefined;
let serverLauncher: ServerLauncher | undefined;

// --- Activation Function ---
export function activate(context: vscode.ExtensionContext) {
  loadWorkspaceEnv(); // Load environment variables first

  // --- 1. Initialize Server Launcher ---
  serverLauncher = new ServerLauncher(context);
  context.subscriptions.push(
    serverLauncher,
  );

  // --- 2. Initialize Your Providers (Pass ServerLauncher to DiagramEditorProvider) ---
  diagramEditorProvider = new DiagramEditorProvider(context, serverLauncher);
  jsonReadonlyProvider = new JsonReadonlyProvider();
  context.subscriptions.push(
    vscode.workspace.registerTextDocumentContentProvider('json-readonly', jsonReadonlyProvider),
  );

  // --- 3. Register Existing Commands ---
  registerDataStoryCommands(
    context,
    serverLauncher,
    diagramEditorProvider,
    jsonReadonlyProvider);

  serverLauncher?.outputChannel.appendLine('Congratulations, your extension "ds-ext" is now active!');
  serverLauncher?.outputChannel.appendLine(`ds-ext is installed at ${context.extensionPath}`);

  context.subscriptions.push(
    vscode.window.registerCustomEditorProvider(
      'ds-ext.diagramEditor',
      diagramEditorProvider,
      {
        webviewOptions: {
          retainContextWhenHidden: true,
        },
        supportsMultipleEditorsPerDocument: true,
      },
    ),
  );

  // --- 5. Auto-start the server (Optional) ---
  serverLauncher.startServer().catch(err => {
    console.error('Failed to auto-start server:', err);
    vscode.window.showErrorMessage('Failed to automatically start the DataStory server.');
  });

  console.log('ds-ext activation complete.');
}

export function deactivate() {
  console.log('Deactivating "ds-ext" extension.');
  jsonReadonlyProvider?.dispose();
}
