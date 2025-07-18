import { DsExtConfig } from './utils/DsExtConfig';
import * as vscode from 'vscode';
import { ServerStatus } from './DataStoryServerStatusBarItem';

export interface AbstractServer {
  start(): void;

  stop(): Promise<void>;
}

export interface BaseServerOptions {
  serverEntryPath: string,
  dsExtConfig: DsExtConfig,
  outputChannel: vscode.OutputChannel,
  workspaceDir: string,
  onStatusUpdate: (status: ServerStatus, details?: string) => void,
  onServerExit: (code: number | null, signal: NodeJS.Signals | string | null) => void,
}
