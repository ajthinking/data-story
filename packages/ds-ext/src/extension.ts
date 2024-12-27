import * as vscode from 'vscode';
import { DiagramEditorProvider } from './DiagramEditorProvider';
import * as fs from 'fs';
import * as path from 'path';
import { createDemosDirectory } from './commands/createDemosDirectory';
import { spawn } from 'child_process';

let diagramEditorProvider: DiagramEditorProvider;

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand('ds-ext.createDemos', async () => {
    createDemosDirectory();
  });

  diagramEditorProvider = new DiagramEditorProvider(context);

  context.subscriptions.push(
    vscode.window.registerCustomEditorProvider(
      'ds-ext.diagramEditor',
      diagramEditorProvider
    )
  );

  console.log('ds-ext is installed at ', context.extensionPath);
  // run yarn install in the extension folder
  const extensionPath = context.extensionPath;
  // hide cmd window
  const yarnInstall = spawn('yarn', ['install'], { cwd: extensionPath, stdio: 'inherit'
    , shell: false
  });
  yarnInstall.on('close', (code) => {
    console.log(`yarn install exited with code ${code}`);
  });
  yarnInstall.on('error', (err) => {
    console.log('yarn install failed', err);
  });
}

export function deactivate(context: any) {
  diagramEditorProvider.dispose();
}