import * as vscode from 'vscode';
import { DiagramEditorProvider } from './DiagramEditorProvider';
import { createDemosDirectory } from './commands/createDemosDirectory';
import path from 'path';
import * as fs from 'fs';
import { JsonReadonlyProvider } from './JsonReadonlyProvider';

let diagramEditorProvider: DiagramEditorProvider;
let jsonReadonlyProvider: JsonReadonlyProvider | undefined;

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand('ds-ext.createDemos', async () => {
    await createDemosDirectory();
  });

  diagramEditorProvider = new DiagramEditorProvider(context);
  vscode.window.showInformationMessage('Congratulations, your extension "ds-ext" is now active!');
  jsonReadonlyProvider = new JsonReadonlyProvider();
  context.subscriptions.push(
    vscode.workspace.registerTextDocumentContentProvider('json-readonly', jsonReadonlyProvider),
  );
  // 注册命令（保持与原逻辑一致）
  vscode.commands.registerCommand('ds-ext.showDiagramPreview', async (args: vscode.Uri) => {
    const diagramDocument = diagramEditorProvider.provideDiagramContent(args);
    const diagramData = diagramDocument?.data;
    const dataString = JSON.stringify(JSON.parse(new TextDecoder().decode(diagramData)), null, 2);

    // 生成唯一预览 URI（保持原逻辑）
    const readOnlyUri = vscode.Uri.parse(
      `json-readonly:Preview-${args.path}.json`,
    );

    // 更新 Provider 内容
    jsonReadonlyProvider!.updateContent(readOnlyUri, dataString);

    // 打开文档并显示（保持原逻辑）
    const doc = await vscode.workspace.openTextDocument(readOnlyUri);
    await vscode.languages.setTextDocumentLanguage(doc, 'json');
    const editor = await vscode.window.showTextDocument(doc, {
      viewColumn: vscode.ViewColumn.Beside,
      preview: true,
      preserveFocus: true,
    });

    // 监听图表变化并更新内容（改进版本）
    if (diagramDocument) {
      const changeSub = diagramDocument.onDidChange(async (diagramInfo) => {
        // 重新加载最新内容
        const diagramData = diagramInfo.document.data;
        const diagramJson = JSON.parse(new TextDecoder().decode(diagramData));

        // 增量更新而非全量替换
        jsonReadonlyProvider!.updateContent(
          readOnlyUri,
          JSON.stringify(diagramJson, null, 2),
        );
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
