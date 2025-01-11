import * as vscode from 'vscode';
import { DiagramDocument } from './DiagramDocument';
import path from 'path';
import { DiagramObserverStorage, InputObserverController, ObserverStorage } from '@data-story/core';
import { MessageHandler } from './MessageHandler';
import { onRun } from './messageHandlers/onRun';
import { onGetNodeDescriptions } from './messageHandlers/onGetNodeDescriptions';
import { onUpdateDiagram } from './messageHandlers/onUpdateDiagram';
import { getDiagram } from './messageHandlers/getDiagram';
import { onToast } from './messageHandlers/onToast';
import { observeLinkItems } from './messageHandlers/observeLinkItems';
import { observeLinkCounts } from './messageHandlers/observeLinkCounts';
import { observeNodeStatus } from './messageHandlers/observeNodeStatus';
import { observeLinkUpdate } from './messageHandlers/observeLinkUpdate';
import { getDataFromStorage } from './messageHandlers/getDataFromStorage';
import { cancelObservation } from './messageHandlers/cancelObservation';
import { DuckDBStorage } from './duckDBStorage';
import { FileStorage } from './fileStorage';
import { loadConfig } from './loadConfig';
import { DataStoryConfig } from './DataStoryConfig';

export class DiagramEditorProvider implements vscode.CustomEditorProvider<DiagramDocument> {
  private readonly _onDidChangeCustomDocument = new vscode.EventEmitter<vscode.CustomDocumentEditEvent<DiagramDocument>>();
  public readonly onDidChangeCustomDocument = this._onDidChangeCustomDocument.event;
  private inputObserverController!: InputObserverController;
  private observerStorage!: ObserverStorage;
  private config: DataStoryConfig;

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

  async dispose(): Promise<void> {
    await this.observerStorage.close();
  }

  private async init(): Promise<void> {

  }

  constructor(private readonly context: vscode.ExtensionContext) {
    this.config = loadConfig(this.context);

    const storages = {
      DUCK_DB: DuckDBStorage,
      FILE: FileStorage,
      IN_MEMORY: DiagramObserverStorage,
    };

    let Storage = storages[this.config.storage];
    if(!Storage) throw new Error(`Unknown storage type: ${this.config.storage}`);

    try {
      this.observerStorage = new Storage();
      console.log(`Successfully initialized storage ${this.config.storage}`);
    } catch (error) {
      console.log(`Failed to initialize storage ${this.config.storage}. Using in-memory storage instead.`);
      this.observerStorage = new DiagramObserverStorage();
    }

    this.inputObserverController = new InputObserverController(this.observerStorage);
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

    const postMessage = (msg: any) => {
      // Webview is disposed, but webviewPanel.postMessage is still being referenced. To prevent errors, we need to mock webviewPanel.postMessage.
      if (webviewPanel?.webview?.postMessage) {
        return webviewPanel?.webview?.postMessage(msg);
      }
    };

    const disposables: (Promise<() => void>)[] = [];
    const unsubscribe = webviewPanel.webview.onDidReceiveMessage(event => {
      const handlers: Record<string, MessageHandler> = {
        run: onRun,
        getNodeDescriptions: onGetNodeDescriptions,
        updateDiagram: onUpdateDiagram,
        toast: onToast,
        getDiagram,
        observeLinkItems,
        observeLinkCounts,
        observeNodeStatus,
        observeLinkUpdate,
        getDataFromStorage,
        cancelObservation,
      };

      const handler = handlers[event.type];
      if (!handler) {
        console.error(`No handler found for event type: ${event.type}. Available handlers: ${Object.keys(handlers).join(', ')}`);
        return;
      }

      const disposable = handler({ postMessage, event, document, inputObserverController: this.inputObserverController });
      if(typeof disposable === 'function' && disposable){
        disposables.push(disposable);
      }
    });

    webviewPanel.onDidDispose(() => {
      unsubscribe.dispose();
      disposables.forEach(async (disposable) => (await disposable)());
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
