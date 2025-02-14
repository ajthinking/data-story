import vscode from 'vscode';

export class JsonReadonlyProvider implements vscode.TextDocumentContentProvider {
  // 存储各 URI 对应的内容
  private contentMap = new Map<string, string>();
  readonly onDidChangeEmitter = new vscode.EventEmitter<vscode.Uri>();
  readonly onDidChange = this.onDidChangeEmitter.event;

  // 更新指定 URI 的内容
  updateContent(uri: vscode.Uri, content: string) {
    this.contentMap.set(uri.toString(), content);
    this.onDidChangeEmitter.fire(uri); // 通知 VS Code 内容更新
  }

  provideTextDocumentContent(uri: vscode.Uri): string {
    return this.contentMap.get(uri.toString()) || '';
  }
}