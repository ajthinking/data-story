import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';

export function createDataStoryDB(): string {
  const workspacePath = vscode.workspace.workspaceFolders![0].uri.fsPath;

  // Construct the datastory directory path
  const datastoryDir = path.join(workspacePath, 'datastory');

  // Check if the datastory directory exists, create if it doesn't
  if (!fs.existsSync(datastoryDir)) {
    fs.mkdirSync(datastoryDir);
  }

  const dbPath = path.join(datastoryDir, 'execution.db');

  // Create the execution.db file
  fs.writeFile(dbPath, '', (err) => {
    if (err) {
      console.error('Error creating execution.db:', err);
    } else {
      console.log('execution.db created successfully in datastory directory.');
    }
  });

  return dbPath;
}
