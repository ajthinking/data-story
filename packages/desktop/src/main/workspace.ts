/**
 * Workspace Class: Primarily responsible for reading dotenv from the directory,
 * and handling the read/write diagrams and read/write settings.
 */
import path from 'path';
import * as fs from 'fs';
import * as os from 'os';
import * as dotenv from 'dotenv';
import { OpenedDiagramResult, MainWindowActions } from '../types';
import { app, dialog } from 'electron';
import fsAsync from 'fs/promises';
// ************************************************************************************************
// DataStory Settings
// ************************************************************************************************

export class Workspace {
  settingsFileName = '.data-story.json';
  envPath = '.env';

  constructor(protected filePath: string) {
  }

  getDirectoryPath = (): string => {
    return path.dirname(this.filePath);
  }

  openDiagram = async(mainWindow: MainWindowActions): Promise<OpenedDiagramResult> => {
    const result: OpenedDiagramResult = {
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
        this.filePath = file.filePaths[0];
        console.log('filePaths[0]:', file.filePaths[0]);
        console.log('filePath:', file.filePaths);
        result.data = await fsAsync.readFile(file.filePaths[0], 'utf8');
        result.isSuccess = true;

        if (mainWindow) {
          this.initSettingsAndEnv(mainWindow);
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

  saveDiagram = async(jsonData: string, mainWindow: MainWindowActions): Promise<OpenedDiagramResult> => {
    const result: OpenedDiagramResult = {
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
        this.updateSettings();
        mainWindow.setTitle(`Data Story - ${file.filePath}`);

        result.isSuccess = true;
      }

      return result;
    } catch(err) {
      result.data = err;
      return result;
    }
  }

  updateSettings = () => {
    const settingsFilePath = path.join(this.getDirectoryPath(), this.settingsFileName);
    const settings = this.readSettings(settingsFilePath);
    settings.workspace = this.getDirectoryPath();
    this.writeSettings(settings, settingsFilePath);
    return settings;
  }

  initSettingsAndEnv(mainWindow: MainWindowActions) {
    this.updateSettings();
    this.loadEnvs();
    mainWindow.setTitle(`Data Story - ${this.filePath}`);
  }

  protected readSettings(settingsFilePath: string) {
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

  protected writeSettings(settings: Record<string, any>, settingsFilePath: string) {
    try {
      const settingsString = JSON.stringify(settings, null, 2); // Pretty print
      fs.writeFileSync(settingsFilePath, settingsString);
      console.log('Saved settings!')
    } catch(err) {
      console.error('Error writing settings file:', err);
    }
  }

  protected loadEnvs() {
    const envPath = path.join(this.getDirectoryPath(), '.env');
    if (fs.existsSync(envPath)) {
      dotenv.config({ path: envPath });
      console.log('Environment variables loaded from:', envPath);
    } else {
      console.log('.env file not found in workspace:', this.getDirectoryPath());
    }
  }
}

const defaultDiagramName = 'diagram.json';
const defaultPath = path.join(os.homedir(), defaultDiagramName);

/**
 * DefaultWorkspace Class: Extends Workspace and provides default path for the workspace
 */
export class DefaultWorkspace extends Workspace {
  constructor() {
    super(defaultPath);
  }

  openDiagram = async(mainWindow: MainWindowActions): Promise<OpenedDiagramResult> => {
    this.initSettingsAndEnv(mainWindow);
    return { data: '{}', isSuccess: true };
  }
}
