import * as vscode from 'vscode';
import { DiagramDocument } from './DiagramDocument';
import path from 'path';
import { MessageHandler } from './MessageHandler';
import { onToast } from './messageHandlers/onToast';
import { onEdgeDoubleClick } from './messageHandlers/onEdgeDoubleClick';
import { loadConfig } from './loadConfig';
import { DataStoryConfig } from './DataStoryConfig';
import { ServerLauncher } from './serverLauncher';

export class DiagramEditorProvider implements vscode.CustomEditorProvider<DiagramDocument> {
  public readonly onDidChangeCustomDocument = new vscode.EventEmitter<vscode.CustomDocumentEditEvent<DiagramDocument>>().event;
  private contentMap = new Map<string, DiagramDocument>();
  private config: DataStoryConfig;

  constructor(
    private readonly context: vscode.ExtensionContext,
    private readonly serverLauncher: ServerLauncher,
  ) {
    this.config = loadConfig(this.context);
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

    const diagramDocument = await DiagramDocument.create(uri);
    this.contentMap.set(diagramId, diagramDocument);
    return diagramDocument;
  }

  async resolveCustomEditor(
    document: DiagramDocument,
    webviewPanel: vscode.WebviewPanel,
    _token: vscode.CancellationToken,
  ): Promise<void> {
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
        toast: onToast,
        onEdgeDoubleClick,
      };

      const handler = handlers[event.type];
      if (!handler) {
        console.error(`No handler found for event type: ${event.type}. Available handlers: ${Object.keys(handlers).join(', ')}`);
        return;
      }

      // @ts-ignore
      const disposable = handler({ postMessage, event, document });
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
    const diagramFilePath = document.uri.fsPath;

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
                window.dsInitialData = {
                  documentId: "${diagramFilePath}",
                  serverEndpoint: "${this.serverLauncher.serverEndpoint}"
                }
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

  private getDiagramId(uri: vscode.Uri): string {
    return uri.toString();
  }
}
