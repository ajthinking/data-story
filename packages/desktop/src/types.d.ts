import { Diagram } from '@data-story/core';
import { Workspace } from './main/workspace';

export interface LocalDiagram {
  type: 'load' | 'save';
  version: string;
  diagram: Diagram;
}

export interface OpenedDiagramResult {
  data: string;
  isSuccess: boolean;
  isCancelled?: boolean;
}

export interface MainWindowActions {
  setTitle: (title: string) => void;
  webContentsSend: (channel: string, data: any) => void;
}

export interface DataStoryWindowContext {
  mainWindowActions: MainWindowActions;
  workspace: Workspace
}

export interface IpcHandlerOptions {
  getMainWindowActions: () =>  MainWindowActions;
  getWorkspace: () => Workspace;
}
