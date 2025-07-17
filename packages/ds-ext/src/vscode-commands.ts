import vscode from 'vscode';
import { ServerLauncher } from './serverLauncher';
import { createDemosDirectory } from './commands/createDemosDirectory';
import { DiagramEditorProvider } from './DiagramEditorProvider';
import { JsonReadonlyProvider } from './JsonReadonlyProvider';
import { DiagramDocument } from './DiagramDocument';
import path from 'path';

export const DataStoryCommands = {
  StartServer: 'ds-ext.startServer',
  StopServer: 'ds-ext.stopServer',
  RestartServer: 'ds-ext.restartServer',
  ShowOutput: 'ds-ext.showOutput',
  CreateDemos: 'ds-ext.createDemos',
  ShowDiagramPreview: 'ds-ext.showDiagramPreview',
};

export function registerDataStoryCommands(
  context: vscode.ExtensionContext,
  serverLauncher: ServerLauncher,
  diagramEditorProvider: DiagramEditorProvider,
  jsonReadonlyProvider: JsonReadonlyProvider,
) {
  context.subscriptions.push(
    vscode.commands.registerCommand(DataStoryCommands.StartServer, async () => {
      await serverLauncher.startServer();
    }),
    vscode.commands.registerCommand(DataStoryCommands.StopServer, async () => {
      await serverLauncher.stopServer();
    }),
    vscode.commands.registerCommand(DataStoryCommands.RestartServer, async () => {
      await serverLauncher.restartServer();
    }),
    vscode.commands.registerCommand(DataStoryCommands.ShowOutput, async () => {
      await serverLauncher.outputChannel.show();
    }),
    vscode.commands.registerCommand(DataStoryCommands.CreateDemos, async () => {
      await createDemosDirectory();
    }),

    vscode.commands.registerCommand(DataStoryCommands.ShowDiagramPreview, async (args: vscode.Uri) => {
      console.log('args', args);
      const diagramDocument = diagramEditorProvider.provideDiagramContent(args);
      const diagramData = new TextDecoder().decode(diagramDocument?.data);
      let dataString = '';
      if (diagramData) {
        dataString = JSON.stringify(JSON.parse(diagramData), null, 2);
      }
      const readOnlyUri = createReadonlyUri(args);

      jsonReadonlyProvider!.updateContent(readOnlyUri, dataString);

      // Open the document and show readonly content
      const doc = await vscode.workspace.openTextDocument(readOnlyUri);
      await vscode.languages.setTextDocumentLanguage(doc, 'json');
      const editor = await vscode.window.showTextDocument(doc, {
        viewColumn: vscode.ViewColumn.Beside,
        preview: true,
        preserveFocus: true,
      });

      if (diagramDocument) {
        registerDiagramChangeAndCloseListeners(
          context,
          jsonReadonlyProvider,
          diagramDocument,
          readOnlyUri);
      }
    }),
  );
}

const registerDiagramChangeAndCloseListeners = (
  context: vscode.ExtensionContext,
  jsonReadonlyProvider: JsonReadonlyProvider,
  diagramDocument: DiagramDocument, readOnlyUri: vscode.Uri): void => {
  const changeSubscription = diagramDocument.onDidChange(async (diagramInfo) => {
    const diagramJson = JSON.parse(new TextDecoder().decode(diagramInfo.document.data));

    // update the content of the read-only document
    jsonReadonlyProvider!.updateContent(
      readOnlyUri,
      JSON.stringify(diagramJson, null, 2),
    );
  });

  // stop listening when the document is closed
  const closeSubscription = vscode.workspace.onDidCloseTextDocument(closedDoc => {
    if (closedDoc.uri.toString() === readOnlyUri.toString()) {
      changeSubscription.dispose();
      closeSubscription.dispose();
    }
  });
  context.subscriptions.push(changeSubscription, closeSubscription);
};

function createReadonlyUri(args: vscode.Uri): vscode.Uri {
  const fileName = path.basename(args.path, '.json');
  return vscode.Uri.parse(
    `json-readonly:Preview_${fileName}.json`,
  );
}
