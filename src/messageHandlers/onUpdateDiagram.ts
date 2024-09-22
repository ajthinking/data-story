import { MessageHandler } from '../MessageHandler';
import * as vscode from 'vscode';

export const onUpdateDiagram: MessageHandler = async ({
  event,
  document,
}) => {
  const { fileUri, diagram } = event;

  document.update(new TextEncoder().encode(diagram))
  await document.save();
}