// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
// preload.js
import { contextBridge, ipcRenderer } from 'electron';


contextBridge.exposeInMainWorld('electron', {
  receive: (channel: string, data: any) => {
    ipcRenderer.on(channel, data);
  },

  send: (channel: string, data?: string) => {
    ipcRenderer.send(channel, data);
  }
});
