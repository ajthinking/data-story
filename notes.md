### Attempt to have a Raw JSON mode
  // Register the "Open as JSON" command
  context.subscriptions.push(
    vscode.commands.registerCommand('ds-ext.openAsJson', () => {
      const visibleEditors = vscode.window.visibleTextEditors;
  
      if (visibleEditors.length > 0) {
          const documentUri = visibleEditors[0].document.uri;
  
          console.log("Visible Editor URI:", documentUri.fsPath);
          // Reopen the file as JSON (use VS Code's built-in text editor)
          vscode.commands.executeCommand('vscode.openWith', documentUri, 'text');  // Switch to the built-in text editor
      } else {
          vscode.window.showErrorMessage('No visible editor found.');
      }
  })
  );
