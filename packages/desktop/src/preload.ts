// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
// preload.js
import { contextBridge, ipcRenderer } from 'electron';


contextBridge.exposeInMainWorld('electron', {
  send: (channel: 'save-json', data: string) => {
    ipcRenderer.send(channel, data);
  }
});
console.log('preload script loaded successfully'); // 确认预加载脚本已经加载并执行到这里
