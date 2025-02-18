import vscode from 'vscode';

export class JsonReadonlyProvider implements vscode.TextDocumentContentProvider {
  // Store the content corresponding to each URI
  private contentMap = new Map<string, string>();
  readonly onDidChangeEmitter = new vscode.EventEmitter<vscode.Uri>();
  readonly onDidChange = this.onDidChangeEmitter.event;

  // Update the content of the specified URI
  updateContent(uri: vscode.Uri, content: string) {
    this.contentMap.set(uri.toString(), content);
    // Notify VS Code that the content has been updated
    this.onDidChangeEmitter.fire(uri);
  }

  provideTextDocumentContent(uri: vscode.Uri): string {
    return this.contentMap.get(uri.toString()) || '';
  }

  dispose() {
    this.contentMap.clear();
    this.onDidChangeEmitter.dispose();
  }
}