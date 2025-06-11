import { MessageHandler } from '../MessageHandler';
import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

export const onEdgeDoubleClick: MessageHandler = async ({ event }) => {
  console.log('onEdgeDoubleClick', event);
  const workspaceRoot = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath || '';

  // Create a new .ds file named after the edge ID
  const edgeId = event.edgeId;
  const dsFileName = `${edgeId}.table.ds`;
  const dsFilePath = path.join(workspaceRoot, dsFileName);

  console.log('Creating DS file:', dsFilePath);

  // Create an initial empty diagram file if it doesn't exist
  if (!fs.existsSync(dsFilePath)) {
    fs.writeFileSync(dsFilePath, '');
  }

  // Create a URI for the new file
  const dsFileUri = vscode.Uri.file(dsFilePath);

  // Open the file with the custom editor
  try {
    await vscode.commands.executeCommand('vscode.openWith', dsFileUri, 'ds-ext.diagramEditor');
    console.log('Successfully opened DS file:', dsFilePath);
  } catch (error) {
    console.error('Failed to open DS file:', error);
    vscode.window.showErrorMessage(`Failed to open edge diagram: ${error}`);
  }
};
