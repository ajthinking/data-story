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
  const contentProvider = new class implements vscode.TextDocumentContentProvider {
    onDidChangeEmitter = new vscode.EventEmitter<vscode.Uri>();
    onDidChange = this.onDidChangeEmitter.event;
    provideTextDocumentContent(uri: vscode.Uri): string {
      const result = new TextDecoder().decode(diagramEditorProvider.diagramDocument?.data);
      return JSON.stringify(JSON.parse(result), null, 2);
    }
  };

  vscode.commands.registerCommand('ds-ext.showDiagramPreview', async () => {
    // 通过自定义 scheme 强制只读特性
    const readOnlyUri = vscode.Uri.parse(
      `json-readonly:PreviewFormattedDiagramData-${vscode.env.machineId}.diagram.json`,
    );

    // 注册内容提供程序（全局唯一）
    vscode.workspace.registerTextDocumentContentProvider('json-readonly', contentProvider);

    // 展示文档最终版本
    const doc = await vscode.workspace.openTextDocument(readOnlyUri);
    await vscode.languages.setTextDocumentLanguage(doc, 'json');

    // 在第二列显示（强制使用原生JSON模式）
    const editor = await vscode.window.showTextDocument(doc, {
      viewColumn: vscode.ViewColumn.Two,
      preview: true,
      preserveFocus: true,
    });

    // 内容同步机制（需要根据实际需求实现，示例逻辑）
    // const updateContent = () => {
    //   // const data = diagramEditorProvider.diagramDocument?.data;
    //   // editor.edit(builder => {
    //   //   builder.replace(new vscode.Range(0,0,doc.lineCount,0),
    //   //     new TextDecoder().decode(data));
    //   // });
    //   contentProvider.onDidChangeEmitter.fire(readOnlyUri); // 触发文档刷新
    // };
    // updateContent();
    const updateContent = async () => {
      try {
        const data = diagramEditorProvider.diagramDocument?.data;
        await editor.edit(builder => {
          builder.replace(
            new vscode.Range(0, 0, doc.lineCount, 0),
            '{}',
          );
        }, { undoStopBefore: false, undoStopAfter: false });

        // contentProvider.onDidChangeEmitter.fire(readOnlyUri); // 触发文档刷新
        vscode.window.showInformationMessage('格式化成功');
      } catch (error) {
        vscode.window.showErrorMessage(`格式化失败: ${error}`);
      }
    };

    setTimeout(updateContent, 1000);
    // await updateContent();
    // // 监听源变更事件
    const disposable = vscode.workspace.onDidChangeTextDocument(e => {
      console.log('[DataStory]: onDidChangeTextDocument444', e.document);
      // @ts-ignore
      if (e.document === diagramEditorProvider.diagramDocument) {
        console.log('[DataStory]: onDidChangeTextDocument333', e.document);
        // @ts-ignore
        outputChannel.appendLine(`[DataStory]: onDidChangeTextDocument333 ${e.document?.uri.toString()}`);
        updateContent();
      }
    });
    context.subscriptions.push(disposable);
    // 销毁时清理 todo:
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

  // 当当前编辑器是 .diagram.json 时自动激活
  context.subscriptions.push(
    vscode.window.onDidChangeActiveTextEditor(editor => {
      if (editor?.document.fileName.endsWith('.diagram.json') || editor?.document.fileName.endsWith('.ds')) {
        console.log('[DataStory]: 1111onDidChangeActiveTextEditor', editor?.document.fileName);
        outputChannel.appendLine(`[DataStory]: onDidChangeActiveTextEditor 111 ${editor?.document.fileName}`);
        // DiagramPreview.currentPanel?.update(editor.document);
      }
    }),
  );
  // 在激活函数中加入自动监控
  context.subscriptions.push(
    vscode.window.onDidChangeVisibleTextEditors(editors => {
      editors.forEach(editor => {
        if (editor.document.fileName.endsWith('.diagram.json')  || editor?.document.fileName.endsWith('.ds')) {
          console.log('[DataStory]: onDidChangeVisibleTextEditors 2222', editor.document.fileName);
          outputChannel.appendLine(`[DataStory]: onDidChangeVisibleTextEditors 222 ${editor.document.fileName}`);
        }
      });
    }),
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