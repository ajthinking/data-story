import * as vscode from 'vscode';

export class DiagramDocument implements vscode.CustomDocument {
  static async create(
    uri: vscode.Uri
  ): Promise<DiagramDocument | PromiseLike<DiagramDocument>> {
    // Read the file content here and create the document
    const fileData = await vscode.workspace.fs.readFile(uri);
    return new DiagramDocument(uri, fileData);
  }

  private constructor(
    public readonly uri: vscode.Uri,
    private documentData: Uint8Array
  ) {}

  get data(): Uint8Array {
    return this.documentData;
  }

  dispose(): void {
    // Clean up resources here if needed
  }

  // Save the document to the file system
  async save(): Promise<void> {
    await vscode.workspace.fs.writeFile(this.uri, this.documentData);
  }

  // Save the document to a different location (Save As functionality)
  async saveAs(targetResource: vscode.Uri): Promise<void> {
    await vscode.workspace.fs.writeFile(targetResource, this.documentData);
  }

  // Revert the document to its original state
  async revert(): Promise<void> {
    const originalData = await vscode.workspace.fs.readFile(this.uri);
    this.documentData = originalData;
  }

  // Backup document, required for untitled or dirty editors
  async backup(destination: vscode.Uri, _token: vscode.CancellationToken): Promise<vscode.CustomDocumentBackup> {
    await this.saveAs(destination);
    return {
      id: destination.toString(),
      delete: () => vscode.workspace.fs.delete(destination)
    };
  }

  // A method to update the document data
  update(newData: Uint8Array) {
    this.documentData = newData;
  }
}