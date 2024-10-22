import { MessageHandler } from '../MessageHandler';
import * as vscode from 'vscode';

export const onUpdateDiagram: MessageHandler = async ({
  event,
  document,
}) => {
  document.update(new TextEncoder().encode(JSON.stringify(event.diagram)));
  await document.save();
};