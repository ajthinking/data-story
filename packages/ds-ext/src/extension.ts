import * as vscode from 'vscode';
import { DiagramEditorProvider } from './DiagramEditorProvider';
import { createDemosDirectory } from './commands/createDemosDirectory';
import path from 'path';
import * as fs from 'fs';
import { DiagramPreview } from './DiagramPreview';
// import { DiagramDocument } from "./DiagramDocument";

let diagramEditorProvider: DiagramEditorProvider;

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand('ds-ext.createDemos', async () => {
    await createDemosDirectory();
  });

  diagramEditorProvider = new DiagramEditorProvider(context);

  // vscode.commands.registerCommand('ds-ext.showDiagramPreview', async () => {
  //   // DiagramPreview.createOrShow(context);
  //   const panel = vscode.window.createWebviewPanel(
  //     'diagramPreview',
  //     'Diagram Preview',
  //     vscode.ViewColumn.Two, // 始终在第二列显示
  //     { enableScripts: true },
  //   );
  //   const documentData = diagramEditorProvider.diagramDocument?.data;
  //   const diagramData = new TextDecoder().decode(documentData);
  //
  //   // use json schema replace the html
  //   panel.webview.html = '<h1>Diagram Preview</h1>' +
  //     `<pre>${diagramData}</pre>`;
  //   console.log('showDiagramPreview 111111111 diagramData', diagramData);
  //   // panel.webview.postMessage({ type: 'update', content: this.documentData });
  // });
  vscode.commands.registerCommand('ds-ext.showDiagramPreview', async () => {
    // 创建临时文档副本（避免污染原文件）
    const tempUri = vscode.Uri.parse('untitled:/Preview.diagram.json');

    const doc = await vscode.workspace.openTextDocument(tempUri);
    const languageId = vscode.languages.match({ language: 'json' }, doc)
      ? undefined
      : await vscode.languages.setTextDocumentLanguage(doc, 'json');

    // 在第二列显示（强制使用原生JSON模式）
    const editor = await vscode.window.showTextDocument(doc, {
      viewColumn: vscode.ViewColumn.Two,
      preview: true,
      preserveFocus: true,
    });

    // 内容同步机制（需要根据实际需求实现，示例逻辑）
    const updateContent = () => {
      const data = diagramEditorProvider.diagramDocument?.data;
      editor.edit(builder => {
        builder.replace(new vscode.Range(0,0,doc.lineCount,0),
          new TextDecoder().decode(data));
      });
    };
    updateContent();
    //
    // // 监听源变更事件
    // const disposable = vscode.workspace.onDidChangeTextDocument(e => {
    //   if (e.document === diagramEditorProvider.diagramDocument) {
    //     updateContent();
    //   }
    // });
    //
    // // 销毁时清理
    // panel.onDidDispose(() => {
    //   disposable.dispose();
    // });
  });

  const outputChannel = vscode.window.createOutputChannel('DS-Ext');
  outputChannel.appendLine('Congratulations, your extension "ds-ext" is now active!');
  outputChannel.appendLine(`ds-ext is installed at ${context.extensionPath}`);
  // outputChannel.show();

  context.subscriptions.push(
    vscode.window.registerCustomEditorProvider(
      'ds-ext.diagramEditor',
      diagramEditorProvider,
    ),
  );

  // 当当前编辑器是 .diagram.json 时自动激活
  // context.subscriptions.push(
  //   vscode.window.onDidChangeActiveTextEditor(editor => {
  //     if (editor?.document.fileName.endsWith('.diagram.json')) {
  //       console.log('onDidChangeActiveTextEditor');
  //       DiagramPreview.currentPanel?.update(editor.document);
  //     }
  //   }),
  // );
  // // 在激活函数中加入自动监控
  // context.subscriptions.push(
  //   vscode.window.onDidChangeVisibleTextEditors(editors => {
  //     editors.forEach(editor => {
  //       if (editor.document.fileName.endsWith('.diagram.json')) {
  //         if (!DiagramPreview.currentPanel) {
  //           DiagramPreview.createOrShow(context);
  //           console.log('onDidChangeVisibleTextEditors 2222');
  //         }
  //       }
  //     });
  //   }),
  // );
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