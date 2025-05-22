export interface DsInitialData {
  serverEndpoint: string;
  documentId: string;
}

declare global {
  interface Window {
    dsInitialData: DsInitialData;
  }
}

export const dsExtensionInitialData = () => window.dsInitialData;
