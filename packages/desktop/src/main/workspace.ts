/**
 * Workspace Class: Primarily responsible for reading dotenv from the directory,
 * and handling the read/write diagrams and read/write settings.
 */
import path from 'path';
import * as fs from 'fs';
import * as os from 'os';
import * as dotenv from 'dotenv';
import {  MainWindowActions } from '../types';
import fsAsync from 'fs/promises';

export class Workspace {
  settingsFileName = '.data-story.json';
  envPath = '.env';

  constructor(public filePath: string) {
  }

  getDirectoryPath = (): string => {
    return path.dirname(this.filePath);
  }

  openDiagram = async(mainWindow: MainWindowActions, filePath: string): Promise<string> => {
    this.filePath = filePath;
    const data = await fsAsync.readFile(filePath, 'utf8');

    if (mainWindow) {
      this.initSettingsAndEnv(mainWindow);
    } else {
      throw new Error('Main window not found, cannot register open changes');
    }
    return data;
  }

  saveDiagram = async(jsonData: string, mainWindow: MainWindowActions, filePath: string): Promise<void> => {
    await fsAsync.writeFile(filePath, jsonData);
    this.filePath = filePath;
    // update the settings & title
    this.updateSettings();
    mainWindow.setTitle(`Data Story - ${filePath}`);
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

  // Note: Each call to `loadEnv` appends new environment variables to `env`.
  protected loadEnvs() {
    const envPath = path.join(this.getDirectoryPath(), this.envPath);
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

  initSettingsAndEnv(mainWindow: MainWindowActions): void {
    super.initSettingsAndEnv(mainWindow);
    mainWindow.setTitle('Data Story - Untitled');
  }

}
