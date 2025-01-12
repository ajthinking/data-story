import { MessageHandler } from '../MessageHandler';
import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

export const onEdgeDoubleClick: MessageHandler = async ({ event }) => {
  const workspaceRoot = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath || '';
  const tempFilePath = path.join(workspaceRoot, 'temp_table_view.txt');

  const content = `TODO: open the Table component here. Use the edge id (${event.edgeId}) to get the relevant data`;

  fs.writeFileSync(tempFilePath, content);

  const document = await vscode.workspace.openTextDocument(tempFilePath);
  await vscode.window.showTextDocument(document, { preview: false });
};
