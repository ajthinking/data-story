import * as vscode from 'vscode';
import { DiagramDocument } from './DiagramDocument';
import { InputObserverController } from '@data-story/core';

export type MessageHandlerArgs = {
  webviewPanel: vscode.WebviewPanel;
  event: any;
  document: DiagramDocument,
  inputObserverController: InputObserverController
};

export type MessageHandler = (args: MessageHandlerArgs) => Promise<void>;