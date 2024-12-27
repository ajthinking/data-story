import * as vscode from 'vscode';
import { DiagramEditorProvider } from './DiagramEditorProvider';
import { createDemosDirectory } from './commands/createDemosDirectory';

let diagramEditorProvider: DiagramEditorProvider;

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand('ds-ext.createDemos', async () => {
    createDemosDirectory();
  });
  const outputChannel = vscode.window.createOutputChannel('DS-Ext');
  outputChannel.appendLine('Congratulations, your extension "ds-ext" is now active!');

  diagramEditorProvider = new DiagramEditorProvider(context);
  context.subscriptions.push(
    vscode.window.registerCustomEditorProvider(
      'ds-ext.diagramEditor',
      diagramEditorProvider
    )
  );

  const installScriptsPath = `${context.extensionPath}/install-scripts`;

  outputChannel.appendLine(`ds-ext is installed at ${context.extensionPath}`);
  outputChannel.show();

  vscode.window.showInformationMessage(
    'The "ds-ext" extension requires "duckdb-async". Would you like to install it now?',
    'Yes',
    'No'
  ).then(selection => {
    if (selection === 'Yes') {
      // Create a new terminal
      const terminal = vscode.window.createTerminal('DuckDB Setup');
      terminal.show();
      // Change directory to the extension path
      terminal.sendText(`cd "${installScriptsPath}"`);
      // run the install command
      terminal.sendText('npm install duckdb-async');
    }
  });
}

export function deactivate(context: any) {
  diagramEditorProvider.dispose();
}