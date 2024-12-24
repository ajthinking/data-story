import * as vscode from 'vscode';
import { DiagramEditorProvider } from './DiagramEditorProvider';
import { createDemosDirectory } from './commands/createDemosDirectory';
import { exec, spawn } from 'child_process';

let diagramEditorProvider: DiagramEditorProvider;

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand('ds-ext.createDemos', async () => {
    createDemosDirectory();
  });

  console.log('Congratulations, your extension "ds-ext" is now active!', context);
  console.log('ds-ext is installed at ', context.extensionPath);
  // run yarn install in the extension folder
  const extensionPath = context.extensionPath;
  // 提示用户是否安装 duckdb-async
  vscode.window.showInformationMessage(
    'Do you want to install duckdb-async?',
    'Yes',
    'No'
  ).then(selection => {
    if (selection === 'Yes') {
      // 创建一个新的终端
      const terminal = vscode.window.createTerminal('DuckDB Setup', extensionPath);
      // 在终端中运行安装命令
      terminal.show();
      terminal.sendText('npm install duckdb-async');
    }
  });

  diagramEditorProvider = new DiagramEditorProvider(context);

  context.subscriptions.push(
    vscode.window.registerCustomEditorProvider(
      'ds-ext.diagramEditor',
      diagramEditorProvider
    )
  );
}

export function deactivate(context: any) {
  diagramEditorProvider.dispose();
}