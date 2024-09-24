import * as vscode from 'vscode';
import { DiagramEditorProvider } from './DiagramEditorProvider';

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.window.registerCustomEditorProvider(
      'ds-ext.diagramEditor',
      new DiagramEditorProvider(context)
  )
  );
}

export function deactivate() {}