import { MessageHandler } from '../MessageHandler';
import * as vscode from 'vscode';

export const onUpdateDiagram: MessageHandler = async ({
  event,
  document,
}) => {
  console.log("In onUpdateDiagram: attempting update of diagram.")

  const { fileUri, diagramData } = event;
    
  document.update(diagramData)
}