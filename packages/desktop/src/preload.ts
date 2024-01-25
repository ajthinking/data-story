// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
// preload.js
import { contextBridge, ipcRenderer } from 'electron';
import { LocalDiagram } from './types';


contextBridge.exposeInMainWorld('electron', {

  saveDiagram: (data: string): Promise<void> => {
    return ipcRenderer.invoke('save-diagram', data);
  },

  openFileDialog: (): Promise<LocalDiagram> => {
    return ipcRenderer.invoke('open-diagram');
  },

});
