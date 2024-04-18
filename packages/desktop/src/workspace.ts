/**
 * Workspace Class: Primarily responsible for reading dotenv from the directory,
 * and handling the read/write diagrams and read/write settings.
 */
import path from 'path';
import * as fs from 'fs';
import * as os from 'os';
import * as dotenv from 'dotenv';

// ************************************************************************************************
// DataStory Settings
// ************************************************************************************************
const settingsFilePath = path.join(os.homedir(), '.data-story.json');

export function readSettings() {
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

export function writeSettings(settings: Record<string, any>) {
  try {
    const settingsString = JSON.stringify(settings, null, 2); // Pretty print
    fs.writeFileSync(settingsFilePath, settingsString);
    console.log('Saved settings!')
  } catch(err) {
    console.error('Error writing settings file:', err);
  }
}

export function loadEnvs(workspacePath: string) {
  const envPath = path.join(workspacePath, '.env');
  if (fs.existsSync(envPath)) {
    dotenv.config({ path: envPath });
    console.log('Environment variables loaded from:', envPath);
  } else {
    console.log('.env file not found in workspace:', workspacePath);
  }
}
