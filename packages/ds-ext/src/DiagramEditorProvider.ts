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
import { onEdgeDoubleClick } from './messageHandlers/onEdgeDoubleClick';
import { DuckDBStorage } from './duckDBStorage';
import { FileStorage } from './fileStorage';
import { loadConfig } from './loadConfig';
import { DataStoryConfig } from './DataStoryConfig';
import { abortExecution } from './messageHandlers/abortExecution';

export class DiagramEditorProvider implements vscode.CustomEditorProvider<DiagramDocument> {
  public readonly onDidChangeCustomDocument = new vscode.EventEmitter<vscode.CustomDocumentEditEvent<DiagramDocument>>().event;
  /**
   * Since a DiagramEditorProvider can correspond to multiple DiagramDocuments, each DiagramDocument requires its own InputObserverController and ObserverStorage.
   * Therefore, we need to differentiate them using diagramId or uri.
   */
  private InputObserverControllerMap: Map<string, InputObserverController> = new Map();
  private observerStorageMap: Map<string, ObserverStorage> = new Map();
  private contentMap = new Map<string, DiagramDocument>();
  private config: DataStoryConfig;

  constructor(private readonly context: vscode.ExtensionContext) {
    this.config = loadConfig(this.context);
  }

  async dispose(): Promise<void> {
    await this.observerStorageMap.forEach(async (storage) => await storage.close());
  }

  private async initializeStorage(diagramId: string) {
    const storages = {
      DUCK_DB: DuckDBStorage,
      FILE: FileStorage,
      IN_MEMORY: DiagramObserverStorage,
    };

    let Storage = storages[this.config.storage];
    if(!Storage) throw new Error(`Unknown storage type: ${this.config.storage}`);
    let observerStorage: ObserverStorage;
    try {
      observerStorage = new Storage(diagramId);
      await observerStorage.init?.();
    } catch (error) {
      console.log(`Failed to initialize storage ${this.config.storage}. Using in-memory storage instead.`);
      console.log(error);
      observerStorage = new DiagramObserverStorage(diagramId);
      await observerStorage.init?.();
    }

    this.observerStorageMap.set(diagramId, observerStorage);
    this.InputObserverControllerMap.set(diagramId, new InputObserverController(observerStorage));
  }

  /**
   * openCustomDocument is called when the first time an editor for a given resource is opened.
   * When multiple instances of the editor are opened or closed, the OpenCustomDocument method won't be re-invoked.
   */
  async openCustomDocument(
    uri: vscode.Uri,
    _openContext: vscode.CustomDocumentOpenContext,
    _token: vscode.CancellationToken,
  ): Promise<DiagramDocument> {
    // Initialize storage with diagram ID from the file name
    const diagramId = this.getDiagramId(uri);
    await this.initializeStorage(diagramId);

    const diagramDocument = await DiagramDocument.create(uri);
    this.contentMap.set(diagramId, diagramDocument);
    return diagramDocument;
  }

  resolveCustomEditor(
    document: DiagramDocument,
    webviewPanel: vscode.WebviewPanel,
    _token: vscode.CancellationToken,
  ): void | Thenable<void> {
    webviewPanel.webview.options = {
      ...webviewPanel.webview.options,
      enableScripts: true,
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
        abortExecution,
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
        onEdgeDoubleClick,
      };

      const handler = handlers[event.type];
      if (!handler) {
        console.error(`No handler found for event type: ${event.type}. Available handlers: ${Object.keys(handlers).join(', ')}`);
        return;
      }

      const diagramId = this.getDiagramId(document.uri);
      const inputObserverController = this.InputObserverControllerMap.get(diagramId);
      // @ts-ignore
      const disposable = handler({ postMessage, event, document, inputObserverController });
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
    const mainScript = path.join(this.context.extensionPath, 'dist', 'app', 'app.mjs');

    const scriptUri = webview.asWebviewUri(
      vscode.Uri.file(mainScript),
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

  provideDiagramContent(uri: vscode.Uri): DiagramDocument {
    const diagramId = this.getDiagramId(uri);
    const document = this.contentMap.get(diagramId);
    if (!document) {
      throw new Error('Could not find document');
    }

    return document;
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
    cancellation: vscode.CancellationToken,
  ): Thenable<vscode.CustomDocumentBackup> {
    return document.backup(context.destination, cancellation);
  }

  private async save(document: DiagramDocument, data: string): Promise<void> {
    document.update(Buffer.from(data, 'utf8'));
    await document.save();
  }

  private getDiagramId(uri: vscode.Uri): string {
    return uri.toString();
  }
}
