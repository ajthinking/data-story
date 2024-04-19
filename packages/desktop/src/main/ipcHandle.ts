/**
 * DataStoryBridge link: Centralizes communication methods between the node and web side,
 * such as through preload.ts.
 * The specific methods and structure design will be adjusted according to needs.
 */
import { DataStoryWindowContext, OpenedDiagramResult } from '../types';
import { dialog, ipcMain } from 'electron';

export const registerIpcHandlers = (options: DataStoryWindowContext) => {
  const { mainWindowActions, workspace } = options;

  const save = async (jsonData: string): Promise<OpenedDiagramResult> => {
    const result: OpenedDiagramResult = {
      data: '',
      isSuccess: false,
    }

    try {
      const file = await dialog.showSaveDialog({
        title: 'Save your Diagram JSON',
        defaultPath: workspace.filePath,
        filters: [
          { name: 'JSON Files', extensions: ['json'] }
        ]
      });

      if (!file.canceled && file.filePath) {
        await workspace.saveDiagram(jsonData, mainWindowActions, file.filePath);
        result.data = jsonData;
        result.isSuccess = true;
      }
      return result;
    } catch(err) {
      result.data = err;
      return result;
    }
  };

  const open = async (): Promise<OpenedDiagramResult> => {
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
        mainWindowActions.webContentsSend('pokeFromServer', { content: 'hahahah' });
        return { isCancelled: true, data: '', isSuccess: true }
      } else if (!file.canceled && file.filePaths.length > 0) {
        result.data = await workspace.openDiagram(mainWindowActions, file.filePaths[0]);
        result.isSuccess = true;
      }
      return result;
    } catch(err) {
      result.data = err;
      return result;
    }
  };

  ipcMain.handle('saveDiagram', async(event, jsonData: string): Promise<OpenedDiagramResult> => {
    return await save(jsonData);
  });

  ipcMain.handle('openDiagram', open);
}
