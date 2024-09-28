import * as vscode from 'vscode';
import { DiagramDocument } from './DiagramDocument';

export type MessageHandlerArgs = {
  webviewPanel: vscode.WebviewPanel;
  event: any;
  document: DiagramDocument
};

export type MessageHandler = (args: MessageHandlerArgs) => Promise<void>;