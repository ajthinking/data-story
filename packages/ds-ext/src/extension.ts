import * as vscode from 'vscode';
import { DiagramEditorProvider } from './DiagramEditorProvider';
import * as fs from 'fs';
import * as path from 'path';
import { createDemosDirectory } from './commands/createDemosDirectory';

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand('ds-ext.createDemos', async () => {
    await createDemosDirectory();
  });

  context.subscriptions.push(
    vscode.window.registerCustomEditorProvider(
      'ds-ext.diagramEditor',
      new DiagramEditorProvider(context)
    )
  );
}

export function deactivate() {}