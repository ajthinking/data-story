/**
 * DataStoryBridge link: Centralizes communication methods between the node and web side,
 * such as through preload.ts.
 * The specific methods and structure design will be adjusted according to needs.
 */
import { IpcResult, MainWindowActions } from '../types';
import { app, dialog, ipcMain } from 'electron';
import { workspace } from './workspace';

export const registerIpcHandlers = (mainWindowActions: MainWindowActions) => {
  ipcMain.handle('saveDiagram', async(event, jsonData: string): Promise<IpcResult> => {
    return await workspace.saveDiagram(jsonData, mainWindowActions);
  });

  ipcMain.handle('openDiagram', () => workspace.openDiagram(mainWindowActions));
}
