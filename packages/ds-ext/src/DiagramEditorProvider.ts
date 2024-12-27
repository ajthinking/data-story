import * as vscode from 'vscode';
import { DiagramDocument } from './DiagramDocument';
import path from 'path';
import { InputObserverController } from '@data-story/core';
import { MessageHandler } from './MessageHandler';
import { onRun } from './messageHandlers/onRun';
import { onGetNodeDescriptions } from './messageHandlers/onGetNodeDescriptions';
import { onUpdateDiagram } from './messageHandlers/onUpdateDiagram';
import { getDiagram } from './messageHandlers/getDiagram';
import { onToast } from './messageHandlers/onToast';
import { observeLinkItems } from './messageHandlers/observeLinkItems';
import { observelinkCounts } from './messageHandlers/observelinkCounts';
import { observeNodeStatus } from './messageHandlers/observeNodeStatus';
import { observeLinkUpdate } from './messageHandlers/observeLinkUpdate';
import { getDataFromStorage } from './messageHandlers/getDataFromStorage';
import { cancelObservation } from './messageHandlers/cancelObservation';
import { DuckDBStorage } from './duckDBStorage';

export class DiagramEditorProvider implements vscode.CustomEditorProvider<DiagramDocument> {
  private readonly _onDidChangeCustomDocument = new vscode.EventEmitter<vscode.CustomDocumentEditEvent<DiagramDocument>>();
  public readonly onDidChangeCustomDocument = this._onDidChangeCustomDocument.event;
  private inputObserverController: InputObserverController;
  private duckDBStorage: DuckDBStorage;

  public static register(context: vscode.ExtensionContext): vscode.Disposable {
    const provider = new DiagramEditorProvider(context);

    return vscode.window.registerCustomEditorProvider(
      'ds-ext.diagramEditor',
      provider,
      {
        webviewOptions: {
          retainContextWhenHidden: true, // Keep the webview loaded when not visible
        },
        supportsMultipleEditorsPerDocument: false,
      }
    );
  }

  dispose(): void {
    this.duckDBStorage.close();
  }

  constructor(private readonly context: vscode.ExtensionContext) {
    const dbPath = path.join(vscode.workspace.workspaceFolders![0].uri.fsPath, 'diagram.db');
    this.duckDBStorage = new DuckDBStorage(dbPath);
    this.inputObserverController = new InputObserverController(this.duckDBStorage);
  }

  async openCustomDocument(
    uri: vscode.Uri,
    _openContext: vscode.CustomDocumentOpenContext,
    _token: vscode.CancellationToken
  ): Promise<DiagramDocument> {
    return DiagramDocument.create(uri);
  }

  resolveCustomEditor(
    document: DiagramDocument,
    webviewPanel: vscode.WebviewPanel,
    _token: vscode.CancellationToken
  ): void | Thenable<void> {
    webviewPanel.webview.options = {
      enableScripts: true
    };

    // Set the webview's HTML content
    webviewPanel.webview.html = this.getWebviewContent(webviewPanel.webview, document);

    // Handle messages from the webview
    webviewPanel.webview.onDidReceiveMessage(event => {
      const handlers: Record<string, MessageHandler> = {
        run: onRun,
        getNodeDescriptions: onGetNodeDescriptions,
        updateDiagram: onUpdateDiagram,
        getDiagram: getDiagram,
        toast: onToast,
        observeLinkItems: observeLinkItems,
        observelinkCounts: observelinkCounts,
        observeNodeStatus: observeNodeStatus,
        observeLinkUpdate: observeLinkUpdate,
        getDataFromStorage: getDataFromStorage,
        cancelObservation: cancelObservation,
      };

      const handler = handlers[event.type];
      if (!handler) {
        console.error(`No handler found for event type: ${event.type}. Available handlers: ${Object.keys(handlers).join(', ')}`);
        return;
      }

      handler({ webviewPanel, event, document, inputObserverController: this.inputObserverController });
    });
  }

  private getWebviewContent(webview: vscode.Webview, document: DiagramDocument): string {
    const diagramData = Buffer.from(document.data).toString('utf8');

    const mainScript = path.join(this.context.extensionPath, 'dist', 'app', 'app.mjs');

    const scriptUri = webview.asWebviewUri(
      vscode.Uri.file(mainScript)
    );

    // Return HTML content for the Webview
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>React App</title>
        </head>
        <body>
            <div id="root"></div>
            <script type="module" src="${scriptUri}"></script>
            <script>
                // Provide the VS Code API and initial data (file URI and diagram content)
                window.vscode = acquireVsCodeApi();
            </script>
        </body>
        </html>
    `;
  }

  // Save changes to the document
  saveCustomDocument(document: DiagramDocument, cancellation: vscode.CancellationToken): Thenable<void> {
    return document.save();
  }

  // Save the document as a new file
  saveCustomDocumentAs(document: DiagramDocument, destination: vscode.Uri, cancellation: vscode.CancellationToken): Thenable<void> {
    return document.saveAs(destination);
  }

  // Revert the document to its original state
  revertCustomDocument(document: DiagramDocument, cancellation: vscode.CancellationToken): Thenable<void> {
    return document.revert();
  }

  // Handle document backup (for dirty or untitled files)
  backupCustomDocument(
    document: DiagramDocument,
    context: vscode.CustomDocumentBackupContext, // Use CustomDocumentBackupContext instead of Uri
    cancellation: vscode.CancellationToken
  ): Thenable<vscode.CustomDocumentBackup> {
    return document.backup(context.destination, cancellation);
  }

  private async save(document: DiagramDocument, data: string): Promise<void> {
    document.update(Buffer.from(data, 'utf8'));
    await document.save();
  }
}
