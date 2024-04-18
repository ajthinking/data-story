/**
 * Workspace Class: Primarily responsible for reading dotenv from the directory,
 * and handling the read/write diagrams and read/write settings.
 */
import path from 'path';
import * as fs from 'fs';
import * as os from 'os';
import * as dotenv from 'dotenv';
import { IpcResult, MainWindowActions } from '../types';
import { app, dialog, ipcMain } from 'electron';
import fsAsync from 'fs/promises';
// ************************************************************************************************
// DataStory Settings
// ************************************************************************************************

const settingsFilePath = path.join(os.homedir(), '.data-story.json');

export class Workspace {

  openDiagram = async(mainWindow: MainWindowActions): Promise<IpcResult> => {
    const result: IpcResult = {
      data: '{}',
      isSuccess: false,
    }
    try {
      const file = await dialog.showOpenDialog({
        properties: ['openFile'],
        filters: [
          { name: 'JSON', extensions: ['json'] }
        ]
      });

      if (file.canceled) {
        mainWindow.webContentsSend('pokeFromServer', { content: 'hahahah' });
        return { isCancelled: true, data: '', isSuccess: true }
      }

      if (!file.canceled && file.filePaths.length > 0) {
        result.data = await fsAsync.readFile(file.filePaths[0], 'utf8');
        result.isSuccess = true;

        if (mainWindow) {
          const workspace = file.filePaths[0]; // Or extract a more specific workspace name from the filePath
          mainWindow.setTitle(`Data Story - ${workspace}`);

          // Persisting the workspace setting
          const settings = this.readSettings(); // Assuming this function synchronously returns the settings object
          settings.workspace = workspace; // Update the workspace setting
          this.writeSettings(settings); // Assuming this function takes the settings object and saves it
        } else {
          console.error('Main window not found, cannot register open changes');
        }
      }
      return result;
    } catch(err) {
      result.data = err;
      return result;
    }
  }

  saveDiagram = async(jsonData: string,mainWindow: MainWindowActions ): Promise<IpcResult> => {
    const result: IpcResult = {
      data: '',
      isSuccess: false,
    };

    try {
      // Show the save dialog
      const file = await dialog.showSaveDialog({
        title: 'Save your Diagram JSON',
        defaultPath: path.join(app.getPath('documents'), 'diagram.json'),
        filters: [
          { name: 'JSON Files', extensions: ['json'] }
        ]
      });

      if (!file.canceled && file.filePath) {
        await fsAsync.writeFile(file.filePath, jsonData);
        // update the settings & title
        const settings = this.readSettings();
        settings.workspace = path.dirname(file.filePath);
        this.writeSettings(settings);
        mainWindow.setTitle(`Data Story - ${file.filePath}`);

        result.isSuccess = true;
      }

      return result;
    } catch(err) {
      result.data = err;
      return result;
    }
  }
  readSettings() {
    try {
      if (fs.existsSync(settingsFilePath)) {
        const rawSettings = fs.readFileSync(settingsFilePath).toString();
        return JSON.parse(rawSettings);
      }
    } catch(err) {
      console.error('Error reading settings file:', err);
    }

    return {}; // Default settings or empty object
  }

  writeSettings(settings: Record<string, any>) {
    try {
      const settingsString = JSON.stringify(settings, null, 2); // Pretty print
      fs.writeFileSync(settingsFilePath, settingsString);
      console.log('Saved settings!')
    } catch(err) {
      console.error('Error writing settings file:', err);
    }
  }

  loadEnvs(workspacePath: string) {
    const envPath = path.join(workspacePath, '.env');
    if (fs.existsSync(envPath)) {
      dotenv.config({ path: envPath });
      console.log('Environment variables loaded from:', envPath);
    } else {
      console.log('.env file not found in workspace:', workspacePath);
    }
  }
}

export const workspace = new Workspace();
