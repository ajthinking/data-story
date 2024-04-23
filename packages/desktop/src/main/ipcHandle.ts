/**
 * primarily handle the communication between the `main process` and the `render process`.
 * handle some native operations in `electron`, such as `dialog`.
 */
import { IpcHandlerOptions, OpenedDiagramResult } from '../types';
import { dialog, ipcMain } from 'electron';
import { Workspace } from './workspace';

export const registerIpcHandlers = (options: IpcHandlerOptions) => {
  const { getMainWindowActions, getWorkspace, switchWorkspace, initWorkspace } = options;
  const mainWindowActions = getMainWindowActions();
  const getCurrentWorkspace = (): Workspace => getWorkspace();

  const save = async(jsonData: string): Promise<OpenedDiagramResult> => {
    const result: OpenedDiagramResult = {
      data: '',
      isSuccess: false,
    }

    try {
      const file = await dialog.showSaveDialog({
        title: 'Save your Diagram JSON',
        defaultPath: getCurrentWorkspace().filePath,
        filters: [
          { name: 'JSON Files', extensions: ['json'] }
        ]
      });

      if (!file.canceled && file.filePath) {
        await getCurrentWorkspace().saveDiagram(jsonData, mainWindowActions, file.filePath);
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
        switchWorkspace(file.filePaths[0]);

        result.data = await getCurrentWorkspace().openDiagram(mainWindowActions, file.filePaths[0]);
        result.isSuccess = true;
      }
      return result;
    } catch(err) {
      result.data = err;
      return result;
    }
  };

  const refreshDesktop = (): void => {
    initWorkspace();
  }

  ipcMain.handle('saveDiagram', async(event, jsonData: string): Promise<OpenedDiagramResult> => {
    return await save(jsonData);
  });

  ipcMain.handle('openDiagram', open);

  ipcMain.handle('refreshDesktop', refreshDesktop);
}
