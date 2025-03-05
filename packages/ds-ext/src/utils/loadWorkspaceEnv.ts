import * as vscode from 'vscode';
import * as path from 'path';
import * as dotenv from 'dotenv';
import * as fs from 'fs';

/**
 * Load environment variables from .env file in workspace root.
 */
export function loadWorkspaceEnv() {
  try {
    // Get the first workspace folder (VS Code workspace root)
    const workspaceFolder = vscode.workspace.workspaceFolders?.[0];

    if (!workspaceFolder) {
      console.log('No workspace folder found');
      return null;
    }

    const envPath = path.join(workspaceFolder.uri.fsPath, '.env');

    // Check if .env file exists
    if (fs.existsSync(envPath)) {
      // Load .env file
      const result = dotenv.config({ path: envPath, override: true });

      if (result.error) {
        console.error('Error loading .env file:', result.error);
        return null;
      }

      console.log('.env file loaded successfully from workspace root');
      return result.parsed;
    } else {
      console.log('No .env file found in workspace root');
      return null;
    }
  } catch (error) {
    console.error('Error loading .env file:', error);
    return null;
  }
}
