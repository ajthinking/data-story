import * as vscode from 'vscode';
import { DiagramEditorProvider } from './DiagramEditorProvider';
import { createDemosDirectory } from './commands/createDemosDirectory';
import path from 'path';
import * as fs from 'fs';
import { JsonReadonlyProvider } from './JsonReadonlyProvider';
import { DiagramDocument } from './DiagramDocument';

let diagramEditorProvider: DiagramEditorProvider;
let jsonReadonlyProvider: JsonReadonlyProvider | undefined;

function createReadonlyUri(args: vscode.Uri): vscode.Uri {
  const fileName = path.basename(args.path, '.json');
  const readOnlyUri = vscode.Uri.parse(
    `json-readonly:Preview_${fileName}.json`,
  );

  return readOnlyUri;
}

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand('ds-ext.createDemos', async () => {
    await createDemosDirectory();
  });

  diagramEditorProvider = new DiagramEditorProvider(context);
  jsonReadonlyProvider = new JsonReadonlyProvider();
  context.subscriptions.push(
    vscode.workspace.registerTextDocumentContentProvider('json-readonly', jsonReadonlyProvider),
  );

  const registerDiagramChangeAndCloseListeners = (diagramDocument: DiagramDocument, readOnlyUri: vscode.Uri): void => {
    const changeSubscription = diagramDocument.onDidChange(async(diagramInfo) => {
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
        closeSubscription .dispose();
      }
    });
    context.subscriptions.push(changeSubscription, closeSubscription );
  };

  vscode.commands.registerCommand('ds-ext.showDiagramPreview', async (args: vscode.Uri) => {
    const diagramDocument = diagramEditorProvider.provideDiagramContent(args);
    const diagramData = diagramDocument?.data;
    const dataString = JSON.stringify(JSON.parse(new TextDecoder().decode(diagramData)), null, 2);
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

  const outputChannel = vscode.window.createOutputChannel('DS-Ext');
  outputChannel.appendLine('Congratulations, your extension "ds-ext" is now active!');
  outputChannel.appendLine(`ds-ext is installed at ${context.extensionPath}`);
  // outputChannel.show();

  context.subscriptions.push(
    vscode.window.registerCustomEditorProvider(
      'ds-ext.diagramEditor',
      diagramEditorProvider,
    ),
  );

  const installScriptsPath = path.join(context.extensionPath, 'install-scripts');
  const duckdbAsyncPath = path.join(installScriptsPath, 'node_modules', 'duckdb-async');

  // Check if duckdb-async is installed to prevent the user from needing to reload the window for installation.
  outputChannel.appendLine(`duckdbAsyncPath: ${duckdbAsyncPath}`);
  outputChannel.appendLine(`fs.existsSync(duckdbAsyncPath): ${fs.existsSync(duckdbAsyncPath)}`);
  if (!fs.existsSync(duckdbAsyncPath)) {
    vscode.window.showInformationMessage(
      'The "ds-ext" extension requires "duckdb-async". Would you like to install it now?',
      'Yes',
      'No',
    ).then(selection => {
      if (selection === 'Yes') {
        // Create a new terminal
        const terminal = vscode.window.createTerminal('DuckDB Setup');
        terminal.show();
        // change the directory to the install-scripts folder and run npm install duckdb-async
        terminal.sendText(`cd "${installScriptsPath}"`);
        terminal.sendText('npm install duckdb-async');
      } else if (selection === 'No') {
        vscode.window.showInformationMessage('Your data will be stored in memory and will not be persisted to a file.');
      }
    });
  }
}

export function deactivate(context: any) {
  diagramEditorProvider.dispose();
  jsonReadonlyProvider?.dispose();
}
