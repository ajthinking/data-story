/// <reference types="vite/client" />
declare module 'virtual:pwa-register' {
  // registerSW 函数的类型声明
  export function registerSW(options?: {
    immediate?: boolean;
    onNeedRefresh?: () => void;
    onOfflineReady?: () => void;
  }): () => void;
}
