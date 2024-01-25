// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
// preload.js
import { contextBridge, ipcRenderer } from 'electron';
import { LocalDiagram } from './types';


contextBridge.exposeInMainWorld('electron', {

  saveDiagram: async(data: string): Promise<void> => {
    ipcRenderer.send('save-diagram', data);
  },

  openFileDialog: async(): Promise<LocalDiagram> => {
    return await ipcRenderer.invoke('open-diagram');
  },

});
