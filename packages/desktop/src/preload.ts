// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
// preload.js
import { contextBridge, ipcRenderer } from 'electron';
import { OpenedDiagramResult } from './types';

contextBridge.exposeInMainWorld('electron', {
  // expose port to the renderer process
  port: process.env.PORT || 3100,

  saveDiagram: (data: string): Promise<OpenedDiagramResult> => {
    return ipcRenderer.invoke('saveDiagram', data);
  },

  openDiagram: (): Promise<OpenedDiagramResult> => {
    return ipcRenderer.invoke('openDiagram');
  },

  refreshDesktop: (): Promise<void> => {
    return ipcRenderer.invoke('refreshDesktop');
  },

  sendPoke: (data: any) => ipcRenderer.send('pokeFromServer', data),
  onPoke: (callback: any) => ipcRenderer.on('pokeFromServer', callback)
});
