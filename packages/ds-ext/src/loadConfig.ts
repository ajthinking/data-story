import fs from 'fs';
import path from 'path';
import vscode from 'vscode';
import { DataStoryConfig } from './DataStoryConfig';

export function loadConfig(extensionContext: vscode.ExtensionContext): DataStoryConfig {
  const defaultConfig: DataStoryConfig = {
    storage: 'DUCK_DB',
  };

  const workspacePath = vscode.workspace.workspaceFolders![0].uri.fsPath;
  const configPath = path.join(workspacePath, 'datastory.config.json');

  if (!fs.existsSync(configPath)) {
    console.log('No datastory.config.json found, using default configuration.');
    return defaultConfig;
  }

  try {
    const configContent = fs.readFileSync(configPath, 'utf8');
    return JSON.parse(configContent) as DataStoryConfig;
  } catch (error) {
    console.log(error);
    console.error('Failed to parse datastory.config.json. Using default configuration.');
    return defaultConfig;
  }
}