import * as vscode from 'vscode';

export type MessageHandlerArgs = {
  webviewPanel: vscode.WebviewPanel;
  event: any;
};

export type MessageHandler = (args: MessageHandlerArgs) => void;