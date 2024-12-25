import * as vscode from 'vscode';
import { DiagramEditorProvider } from './DiagramEditorProvider';
import { createDemosDirectory } from './commands/createDemosDirectory';
import path from 'path';
import * as fs from 'fs';

let diagramEditorProvider: DiagramEditorProvider;

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand('ds-ext.createDemos', async () => {
    createDemosDirectory();
  });

  const outputChannel = vscode.window.createOutputChannel('DS-Ext');
  outputChannel.appendLine('Congratulations, your extension "ds-ext" is now active!');
  outputChannel.appendLine(`ds-ext is installed at ${context.extensionPath}`);
  outputChannel.show();

  diagramEditorProvider = new DiagramEditorProvider(context);
  context.subscriptions.push(
    vscode.window.registerCustomEditorProvider(
      'ds-ext.diagramEditor',
      diagramEditorProvider
    )
  );

  const installScriptsPath = path.join(context.extensionPath, 'install-scripts');
  const duckdbAsyncPath = path.join(installScriptsPath, 'node_modules', 'duckdb-async');

  // Check if duckdb-async is installed to prevent the user from needing to reload the window for installation.
  if (!fs.existsSync(duckdbAsyncPath)) {
    vscode.window.showInformationMessage(
      'The "ds-ext" extension requires "duckdb-async". Would you like to install it now?',
      'Yes',
      'No'
    ).then(selection => {
      if (selection === 'Yes') {
        // Create a new terminal
        const terminal = vscode.window.createTerminal('DuckDB Setup');
        terminal.show();
        // change the directory to the install-scripts folder and run npm install duckdb-async
        terminal.sendText(`cd "${installScriptsPath}"`);
        terminal.sendText('npm install duckdb-async');
      }
    });
  }
}

export function deactivate(context: any) {
  diagramEditorProvider.dispose();
}