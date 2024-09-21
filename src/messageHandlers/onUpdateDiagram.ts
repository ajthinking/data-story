import { MessageHandler } from '../MessageHandler';
import * as vscode from 'vscode';

export const onUpdateDiagram: MessageHandler = async ({
  event,
  document,
}) => {
  const { fileUri, diagramData } = event;
    
  document.update(new TextEncoder().encode(diagramData)) // has no effect on the file system??!
  await document.save();
}