import * as vscode from 'vscode';
import { DiagramEditorProvider } from './DiagramEditorProvider';
import { createDemosDirectory } from './commands/createDemosDirectory';
import path from 'path';
import * as fs from 'fs';

let diagramEditorProvider: DiagramEditorProvider;

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand('ds-ext.createDemos', async () => {
    await createDemosDirectory();
  });

  diagramEditorProvider = new DiagramEditorProvider(context);

  vscode.commands.registerCommand('ds-ext.showDiagramPreview', async (args: vscode.Uri) => {
    const content = await vscode.workspace.fs.readFile(args);
    const decodedContent = JSON.parse(new TextDecoder().decode(content));

    console.log('[DataStory]: showDiagramPreview', decodedContent);
    const contentProvider = new class implements vscode.TextDocumentContentProvider {
      onDidChangeEmitter = new vscode.EventEmitter<vscode.Uri>();
      onDidChange = this.onDidChangeEmitter.event;
      provideTextDocumentContent (uri: vscode.Uri): string {
        const result = new TextDecoder().decode(content);
        console.log('[DataStory]: provideTextDocumentContent111', JSON.parse(result));
        return JSON.stringify(JSON.parse(result), null, 2);
      }
    };

    // 注册内容提供程序（全局唯一）
    vscode.workspace.registerTextDocumentContentProvider('json-readonly', contentProvider);

    const getOriginalPath = args.path;
    const readOnlyUri = vscode.Uri.parse(
      `json-readonly:Preview-${getOriginalPath}.json`,
    );
    // 展示文档最终版本
    const doc = await vscode.workspace.openTextDocument(readOnlyUri);
    await vscode.languages.setTextDocumentLanguage(doc, 'json');

    // 在第二列显示（强制使用原生JSON模式）
    const editor = await vscode.window.showTextDocument(doc, {
      viewColumn: vscode.ViewColumn.Two,
      preview: true,
      preserveFocus: true,
    });

    // Listen for diagram document changes and update preview
    if (diagramEditorProvider.diagramDocument) {
      const changeSub = diagramEditorProvider.diagramDocument.onDidChange(() => {
        console.count('[DataStory]: provideTextDocumentContent111');
        contentProvider.onDidChangeEmitter.fire(readOnlyUri);
      });
      context.subscriptions.push(changeSub);
    }
  });

  const outputChannel = vscode.window.createOutputChannel('DS-Ext');
  outputChannel.appendLine('Congratulations, your extension "ds-ext" is now active!');
  outputChannel.appendLine(`ds-ext is installed at ${context.extensionPath}`);
  outputChannel.show();

  context.subscriptions.push(
    vscode.window.registerCustomEditorProvider(
      'ds-ext.diagramEditor',
      diagramEditorProvider,
    ),
  );

  const installScriptsPath = path.join(context.extensionPath, 'install-scripts');
  const duckdbAsyncPath = path.join(installScriptsPath, 'node_modules', 'duckdb-async');

  // Check if duckdb-async is installed to prevent the user from needing to reload the window for installation.
  outputChannel.appendLine(`duckdbAsyncPath: ${duckdbAsyncPath}`);
  outputChannel.appendLine(`fs.existsSync(duckdbAsyncPath): ${fs.existsSync(duckdbAsyncPath)}`);
  if (!fs.existsSync(duckdbAsyncPath)) {
    vscode.window.showInformationMessage(
      'The "ds-ext" extension requires "duckdb-async". Would you like to install it now?',
      'Yes',
      'No',
    ).then(selection => {
      if (selection === 'Yes') {
        // Create a new terminal
        const terminal = vscode.window.createTerminal('DuckDB Setup');
        terminal.show();
        // change the directory to the install-scripts folder and run npm install duckdb-async
        terminal.sendText(`cd "${installScriptsPath}"`);
        terminal.sendText('npm install duckdb-async');
      } else if (selection === 'No') {
        vscode.window.showInformationMessage('Your data will be stored in memory and will not be persisted to a file.');
      }
    });
  }
}

export function deactivate(context: any) {
  diagramEditorProvider.dispose();
}
