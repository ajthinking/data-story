import * as vscode from 'vscode';
import { DiagramDocument } from './DiagramDocument';
import path from 'path';
import fs from 'fs';
import { MessageHandler } from './MessageHandler';
import { onRun } from './messageHandlers/onRun';
import { onGetNodeDescriptions } from './messageHandlers/onGetNodeDescriptions';
import { onUpdateDiagram } from './messageHandlers/onUpdateDiagram';
import { log } from 'console';
import { onGetDirtyFileContent } from './messageHandlers/onGetDirtyFileContent';
import { onToast } from './messageHandlers/onToast';

export class DiagramEditorProvider implements vscode.CustomEditorProvider<DiagramDocument> {
  private readonly _onDidChangeCustomDocument = new vscode.EventEmitter<vscode.CustomDocumentEditEvent<DiagramDocument>>();
  public readonly onDidChangeCustomDocument = this._onDidChangeCustomDocument.event;

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

  constructor(private readonly context: vscode.ExtensionContext) {}

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
          getDirtyFileContent: onGetDirtyFileContent,
          toast: onToast,
        };
        
        const handler = handlers[event.type];
        if(!handler) throw Error(`No handler found for event type: ${event.type}. Available handlers: ${Object.keys(handlers).join(', ')}`);
    
        handler({ webviewPanel, event, document });
      });
  }

  private getWebviewContent(webview: vscode.Webview, document: DiagramDocument): string {
    const diagramData = Buffer.from(document.data).toString('utf8');

    const mainScript = path.join(this.context.extensionPath, 'dist', 'app', 'app.mjs');

    const scriptUri = webview.asWebviewUri(
        vscode.Uri.file(mainScript)
    );


    // Inject file URI and diagram data into the window object
    const fileUri = webview.asWebviewUri(document.uri);

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
                window.initialData = {
                    fileUri: "${fileUri}",  // Pass file URI
                };
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