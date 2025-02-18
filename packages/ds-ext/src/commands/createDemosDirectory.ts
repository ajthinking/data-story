import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import * as demos from './demos';
import { makeDensityDatasets } from './makeDensityDatasets';

export async function createDemosDirectory() {
  const workspaceFolders = vscode.workspace.workspaceFolders;
  if (!workspaceFolders) {
    vscode.window.showErrorMessage('No workspace folder is open.');
    return;
  }

  const workspaceRoot = workspaceFolders[0].uri.fsPath;
  const demosDir = path.join(workspaceRoot, '.datastory/demos');

  try {
    // Nuke directory if it already exists
    if (fs.existsSync(demosDir)) {
      fs.rmSync(demosDir, { recursive: true });
    }

    // Create the directory
    fs.mkdirSync(demosDir, { recursive: true });

    // Create a demo data directory
    fs.mkdirSync(path.join(demosDir, 'data'));

    // Add a todos.json in the data directory
    fs.writeFileSync(path.join(demosDir, 'data', 'todos.json'), JSON.stringify([
      { id: 1, title: 'Learn DataStory', completed: true },
      { id: 2, title: 'Build a DataStory extension', completed: false },
      { id: 3, title: 'Profit', completed: false },
    ], null, 2));

    // Create density datasets
    makeDensityDatasets(path.join(demosDir, 'data', 'densities'));

    for (const [moduleName, demoFactory] of Object.entries(demos)) {
      const filePath = path.join(demosDir, `${moduleName}.ds`);
      const demoData = await demoFactory();
      fs.writeFileSync(filePath, JSON.stringify(demoData, null, 2));
    }

    vscode.window.showInformationMessage('Created DataStory demos directory.');
  } catch (error: any) {
    vscode.window.showErrorMessage(`Error creating demo files: ${error.message}`);
  }
}