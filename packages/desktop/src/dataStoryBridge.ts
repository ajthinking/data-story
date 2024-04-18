/**
 * DataStoryBridge link: Centralizes communication methods between the node and web side,
 * such as through preload.ts.
 * ( The specific methods and structure design will be adjusted according to needs. )
 */
import { IpcResult } from './types';
import { readSettings, writeSettings } from './workspace';
import path from 'path';
import { app, dialog, ipcMain, BrowserWindow } from 'electron';
import fsAsync from 'fs/promises';

export const open = async(): Promise<IpcResult> => {
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
      mainWindow.webContents.send('pokeFromServer', { content: 'hahahah' });
      return { isCancelled: true, data: '', isSuccess: true }
    }

    if (!file.canceled && file.filePaths.length > 0) {
      result.data = await fsAsync.readFile(file.filePaths[0], 'utf8');
      result.isSuccess = true;

      if (mainWindow) {
        const workspace = file.filePaths[0]; // Or extract a more specific workspace name from the filePath
        mainWindow.setTitle(`Data Story - ${workspace}`);

        // Persisting the workspace setting
        const settings = readSettings(); // Assuming this function synchronously returns the settings object
        settings.workspace = workspace; // Update the workspace setting
        writeSettings(settings); // Assuming this function takes the settings object and saves it
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

ipcMain.handle('saveDiagram', async(event, jsonData: string): Promise<IpcResult> => {
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
      const settings = readSettings();
      settings.workspace = path.dirname(file.filePath);
      writeSettings(settings);
      mainWindow.setTitle(`Data Story - ${file.filePath}`);

      result.isSuccess = true;
    }

    return result;
  } catch(err) {
    result.data = err;
    return result;
  }
});

ipcMain.handle('openDiagram', open);
