import * as vscode from 'vscode';
import path from 'path';
import { TextDecoder } from 'util'; // Node.js built-in
import { DiagramEditorProvider } from './DiagramEditorProvider';
import { createDemosDirectory } from './commands/createDemosDirectory';
import { JsonReadonlyProvider } from './JsonReadonlyProvider';
import { DiagramDocument } from './DiagramDocument';
import { loadWorkspaceEnv } from './utils/loadWorkspaceEnv';

import { ServerLauncher } from './serverLauncher';

// --- Global Variables ---
let diagramEditorProvider: DiagramEditorProvider;
let jsonReadonlyProvider: JsonReadonlyProvider | undefined;
let serverLauncher: ServerLauncher | undefined;

function createReadonlyUri(args: vscode.Uri): vscode.Uri {
  const fileName = path.basename(args.path, '.json');
  const readOnlyUri = vscode.Uri.parse(
    `json-readonly:Preview_${fileName}.json`,
  );
  return readOnlyUri;
}

// --- Activation Function ---
export function activate(context: vscode.ExtensionContext) {
  loadWorkspaceEnv(); // Load environment variables first

  // --- 1. Initialize Server Launcher ---
  serverLauncher = new ServerLauncher(context);

  // --- 2. Initialize Your Providers (Pass ServerLauncher to DiagramEditorProvider) ---
  diagramEditorProvider = new DiagramEditorProvider(context, serverLauncher);
  jsonReadonlyProvider = new JsonReadonlyProvider();
  context.subscriptions.push(
    vscode.workspace.registerTextDocumentContentProvider('json-readonly', jsonReadonlyProvider),
  );

  // --- 3. Register Existing Commands ---
  context.subscriptions.push(
    vscode.commands.registerCommand('ds-ext.createDemos', async () => {
      await createDemosDirectory();
    }),
  );

  // --- Your existing listener registration logic ---
  const registerDiagramChangeAndCloseListeners = (diagramDocument: DiagramDocument, readOnlyUri: vscode.Uri): void => {
    const changeSubscription = diagramDocument.onDidChange(async (diagramInfo) => {
      const diagramJson = JSON.parse(new TextDecoder().decode(diagramInfo.document.data));

      // update the content of the read-only document
      jsonReadonlyProvider!.updateContent(
        readOnlyUri,
        JSON.stringify(diagramJson, null, 2),
      );
    });

    // stop listening when the document is closed
    const closeSubscription = vscode.workspace.onDidCloseTextDocument(closedDoc => {
      if (closedDoc.uri.toString() === readOnlyUri.toString()) {
        changeSubscription.dispose();
        closeSubscription.dispose();
      }
    });
    context.subscriptions.push(changeSubscription, closeSubscription);
  };

  vscode.commands.registerCommand('ds-ext.showDiagramPreview', async (args: vscode.Uri) => {
    const diagramDocument = diagramEditorProvider.provideDiagramContent(args);
    const diagramData = new TextDecoder().decode(diagramDocument?.data);
    let dataString = '';
    if (diagramData) {
      dataString = JSON.stringify(JSON.parse(diagramData), null, 2);
    }
    const readOnlyUri = createReadonlyUri(args);

    jsonReadonlyProvider!.updateContent(readOnlyUri, dataString);

    // Open the document and show readonly content
    const doc = await vscode.workspace.openTextDocument(readOnlyUri);
    await vscode.languages.setTextDocumentLanguage(doc, 'json');
    const editor = await vscode.window.showTextDocument(doc, {
      viewColumn: vscode.ViewColumn.Beside,
      preview: true,
      preserveFocus: true,
    });

    if (diagramDocument) {
      // Listen for diagram changes and update content and stop listening when the document is closed
      registerDiagramChangeAndCloseListeners(diagramDocument, readOnlyUri);
    }
  });

  // --- 4. Register NEW Server Control Commands ---
  context.subscriptions.push(
    vscode.commands.registerCommand('datastory.startServer', () => {
      serverLauncher?.startServer();
    }),
    vscode.commands.registerCommand('datastory.stopServer', () => {
      serverLauncher?.stopServer();
    }),
    vscode.commands.registerCommand('datastory.restartServer', () => {
      serverLauncher?.restartServer();
    }),
  );

  // --- Existing Output Channel & Custom Editor Registration ---
  const outputChannel = vscode.window.createOutputChannel('DS-Ext Server');
  outputChannel.appendLine('Congratulations, your extension "ds-ext" is now active!');
  outputChannel.appendLine(`ds-ext is installed at ${context.extensionPath}`);
  // outputChannel.show();

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

  context.subscriptions.push(
    serverLauncher,
  );

  // --- 5. Auto-start the server (Optional) ---
  serverLauncher?.startServer().catch(err => {
    console.error('Failed to auto-start server:', err);
    vscode.window.showErrorMessage('Failed to automatically start the DataStory server.');
  });

  console.log('ds-ext activation complete.');
}

export function deactivate() {
  console.log('Deactivating "ds-ext" extension.');
  // Clear global references if needed (optional, helps GC)
  serverLauncher = undefined;
  jsonReadonlyProvider?.dispose();
  // diagramEditorProvider = undefined; // If it's not managed by subscriptions directly
  // jsonReadonlyProvider = undefined; // If it's not managed by subscriptions directly

  console.log('ds-ext deactivation finished.');
}
