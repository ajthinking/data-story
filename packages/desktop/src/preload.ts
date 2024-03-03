// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
// preload.js
import { contextBridge, ipcRenderer } from 'electron';
import { IpcResult } from './types';


contextBridge.exposeInMainWorld('electron', {
  saveDiagram: (data: string): Promise<IpcResult> => {
    return ipcRenderer.invoke('saveDiagram', data);
  },

  openDiagram: (): Promise<IpcResult> => {
    return ipcRenderer.invoke('openDiagram');
  },

  sendPoke: (data: any) => ipcRenderer.send('pokeFromServer', data),
  onPoke: (callback: any) => ipcRenderer.on('pokeFromServer', callback)
});