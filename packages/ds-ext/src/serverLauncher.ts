import * as vscode from 'vscode';
import * as cp from 'child_process';
import * as path from 'path';
import * as os from 'os';

// Define possible server states
enum ServerStatus {
  Stopped = 'Stopped',
  Starting = 'Starting',
  Running = 'Running',
  Stopping = 'Stopping',
  Error = 'Error'
}

export class ServerLauncher implements vscode.Disposable {
  // Map to track documents by their URI string
  private documentMap = new Map<string, any>();
  private childProcess: cp.ChildProcess | undefined;
  private status: ServerStatus = ServerStatus.Stopped;
  private statusBarItem: vscode.StatusBarItem;
  private outputChannel: vscode.OutputChannel;
  private nodejsPackagePath: string;
  private port = 3300; // Example: Default port, make this configurable later
  private workspaceDir: string | undefined;
  private isDisposed = false;
  private readonly extensionContext: vscode.ExtensionContext;
  // HTTP client for communicating with the Node.js server
  private httpClient: { post: (url: string, data: any) => Promise<any> } | null = null;

  constructor(context: vscode.ExtensionContext) {
    this.extensionContext = context;
    // Resolve the path to the nodejs package
    this.nodejsPackagePath = path.join(context.extensionPath, '..', 'nodejs'); // Path to the nodejs package in the monorepo

    // Create VS Code UI elements
    this.statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
    this.outputChannel = vscode.window.createOutputChannel('DataStory Server'); // Dedicated output channel

    this.updateStatus(ServerStatus.Stopped);
    this.statusBarItem.show();

    context.subscriptions.push(this); // Register for disposal
  }

  // --- Public Methods ---

  public async startServer(): Promise<void> {
    if (this.isDisposed) {
      console.warn('[ServerLauncher] Attempted to start server after disposal.');
      return;
    }
    if (this.status === ServerStatus.Starting || this.status === ServerStatus.Running) {
      vscode.window.showInformationMessage('Server is already starting or running.');
      return;
    }

    this.workspaceDir = this.getWorkspacePath();
    if (!this.workspaceDir) {
      vscode.window.showErrorMessage('Cannot start server: No workspace folder is open.');
      this.updateStatus(ServerStatus.Error, 'No workspace');
      return;
    }

    this.updateStatus(ServerStatus.Starting);
    this.outputChannel.appendLine(`[Launcher] Starting server using watch:server script from: ${this.nodejsPackagePath}`);
    this.outputChannel.appendLine(`[Launcher] Config: Port=${this.port}, Workspace=${this.workspaceDir}`);
    vscode.window.showInformationMessage('Starting DataStory server...');

    try {
      // Use npm or yarn to run the watch:server script
      const npmCmd = os.platform() === 'win32' ? 'npm.cmd' : 'npm';
      // We need to modify the test-server.ts file to use our port before running the watch:server script
      const testServerPath = path.join(this.nodejsPackagePath, 'test-server.ts');

      // First, let's check if the file exists
      try {
        const fs = require('fs');
        const testServerContent = fs.readFileSync(testServerPath, 'utf8');

        // Replace the port in the test-server.ts file
        const updatedContent = testServerContent.replace(
          /port: \d+,/,
          `port: ${this.port},`,
        );

        fs.writeFileSync(testServerPath, updatedContent, 'utf8');
        this.outputChannel.appendLine(`[Launcher] Updated test-server.ts to use port ${this.port}`);
      } catch (err: any) {
        this.outputChannel.appendLine(`[Launcher] Error updating test-server.ts: ${err.message}`);
      }

      this.childProcess = cp.spawn(
        npmCmd,
        [
          'run',
          'watch:server',
        ],
        {
          stdio: ['pipe', 'pipe', 'pipe'], // Pipe stdin, stdout, stderr
          env: { ...process.env }, // Inherit parent environment
          cwd: this.nodejsPackagePath, // Set CWD to the nodejs package
          shell: true, // Use shell for npm commands
        },
      );

      this.childProcess.stdout?.on('data', (data) => {
        const message = data.toString();
        this.outputChannel.append(message); // Log stdout
        // Simple check for server readiness (customize this string based on your server's output)
        if (message.includes(`Server started on port ${this.port}`) && this.status === ServerStatus.Starting) {
          this.updateStatus(ServerStatus.Running);
          vscode.window.showInformationMessage(`DataStory server running on port ${this.port}.`);
        }
      });

      this.childProcess.stderr?.on('data', (data) => {
        const message = data.toString();
        this.outputChannel.appendLine(`[Server ERROR] ${message}`); // Log stderr
        // Optionally show error message immediately, or wait for exit code
        // vscode.window.showErrorMessage(`Server error: ${message.substring(0, 100)}...`);
        // Consider setting status to Error only on non-zero exit or specific errors
      });

      this.childProcess.on('error', (err) => {
        this.outputChannel.appendLine(`[Launcher ERROR] Failed to start server process: ${err.message}`);
        vscode.window.showErrorMessage(`Failed to start server: ${err.message}`);
        this.handleServerExit(null, 'error'); // Treat launch error as an exit
      });

      this.childProcess.on('close', (code, signal) => {
        this.outputChannel.appendLine(`[Launcher] Server process exited with code ${code}, signal ${signal}.`);
        this.handleServerExit(code, signal);
      });
    } catch (error: any) {
      this.outputChannel.appendLine(`[Launcher CATCH] Error spawning server: ${error.message}`);
      vscode.window.showErrorMessage(`Error launching server: ${error.message}`);
      this.handleServerExit(null, 'catch');
    }
  }

  public async stopServer(): Promise<void> {
    if (this.isDisposed) {
      console.warn('[ServerLauncher] Attempted to stop server after disposal.');
      return;
    }
    if (!this.childProcess || this.status === ServerStatus.Stopped || this.status === ServerStatus.Stopping) {
      vscode.window.showInformationMessage('Server is not running or already stopping.');
      return;
    }

    this.updateStatus(ServerStatus.Stopping);
    vscode.window.showInformationMessage('Stopping DataStory server...');
    this.outputChannel.appendLine('[Launcher] Attempting to stop server process (SIGTERM)...');

    // Send SIGTERM for graceful shutdown. The 'close' event will handle the final state update.
    const killed = this.childProcess.kill('SIGTERM');
    if (!killed) {
      this.outputChannel.appendLine('[Launcher] Failed to send SIGTERM (process already exited?). Forcing cleanup.');
      // If kill returns false, the process might already be dead or unkillable.
      // Force cleanup state, the 'close' event might still fire.
      this.handleServerExit(null, 'killfailed');
    }

    // Optional: Add a timeout to force kill with SIGKILL if SIGTERM doesn't work
    // setTimeout(() => {
    //     if (this.childProcess) {
    //         this.outputChannel.appendLine('[Launcher] Server did not stop gracefully, sending SIGKILL.');
    //         this.childProcess.kill('SIGKILL');
    //     }
    // }, 5000); // 5 second timeout
  }

  public async restartServer(): Promise<void> {
    if (this.isDisposed) {
      console.warn('[ServerLauncher] Attempted to restart server after disposal.');
      return;
    }
    this.outputChannel.appendLine('[Launcher] Restarting server...');
    if (this.childProcess) {
      // If running, stop it first. Listen for close event before starting again.
      this.childProcess.once('close', () => {
        // Check if disposed *during* the stop process before restarting
        if (!this.isDisposed) {
          this.startServer();
        }
      });
      await this.stopServer();
    } else {
      // If not running, just start it.
      await this.startServer();
    }
  }

  // --- Private Methods ---

  private handleServerExit(code: number | null, signal: NodeJS.Signals | string | null): void {
    // Only update status if not already stopped/stopping by explicit command or disposal
    if (this.status !== ServerStatus.Stopping && !this.isDisposed) {
      if (code !== 0 && code !== null) {
        // Non-zero exit code usually indicates an error
        vscode.window.showErrorMessage(`Server stopped unexpectedly (code ${code}, signal ${signal}). Check Output channel.`);
        this.updateStatus(ServerStatus.Error, `Exited code ${code}`);
      } else if (signal === 'error' || signal === 'catch' || signal === 'killfailed') {
        // Handle specific error signals from our logic
        this.updateStatus(ServerStatus.Error, `Failed: ${signal}`);
      }
      else {
        // Normal exit (code 0 or null with SIGTERM/no signal)
        vscode.window.showInformationMessage('DataStory server stopped.');
        this.updateStatus(ServerStatus.Stopped);
      }
    } else if (this.isDisposed) {
      this.updateStatus(ServerStatus.Stopped, 'Disposed'); // Ensure final state is Stopped on dispose
    }
    else {
      // If status was Stopping, transition to Stopped
      this.updateStatus(ServerStatus.Stopped);
    }

    // Clean up process listeners and reference
    this.childProcess?.stdout?.removeAllListeners();
    this.childProcess?.stderr?.removeAllListeners();
    this.childProcess?.removeAllListeners(); // Remove 'error', 'close' listeners
    this.childProcess = undefined;
  }

  private updateStatus(newStatus: ServerStatus, details?: string): void {
    this.status = newStatus;
    let statusBarText = '';
    let statusBarIcon = ''; // Use VS Code $(icon-name) syntax
    let statusBarCommand: string | undefined;
    let statusBarTooltip = `DataStory Server: ${newStatus}`;
    if (details) {
      statusBarTooltip += ` (${details})`;
    }

    switch (newStatus) {
      case ServerStatus.Stopped:
        statusBarIcon = 'debug-stop';
        statusBarText = 'Stopped';
        statusBarCommand = 'datastory.startServer'; // Command to start
        break;
      case ServerStatus.Starting:
        statusBarIcon = 'sync~spin'; // Animated icon
        statusBarText = 'Starting';
        statusBarCommand = undefined; // No action while starting
        break;
      case ServerStatus.Running:
        statusBarIcon = 'debug-alt';
        statusBarText = 'Running';
        statusBarCommand = 'datastory.restartServer'; // Command to restart
        break;
      case ServerStatus.Stopping:
        statusBarIcon = 'sync~spin';
        statusBarText = 'Stopping';
        statusBarCommand = undefined;
        break;
      case ServerStatus.Error:
        statusBarIcon = 'error';
        statusBarText = 'Error';
        statusBarCommand = 'datastory.startServer'; // Command to try starting again
        break;
    }

    this.statusBarItem.text = `$( ${statusBarIcon} ) DataStory: ${statusBarText}`;
    this.statusBarItem.command = statusBarCommand;
    this.statusBarItem.tooltip = statusBarTooltip;
    this.outputChannel.appendLine(`[Launcher] Status changed to: ${newStatus}${details ? ' (' + details + ')' : ''}`);
  }

  private getWorkspacePath(): string | undefined {
    // Return the path of the first workspace folder
    const folders = vscode.workspace.workspaceFolders;
    if (folders && folders.length > 0) {
      return folders[0].uri.fsPath;
    }
    return undefined;
  }

  // --- vscode.Disposable Implementation ---

  // Register a document with the server
  public async registerDocument(uri: vscode.Uri, documentData: any): Promise<boolean> {
    if (this.status !== ServerStatus.Running) {
      this.outputChannel.appendLine('[Launcher] Cannot register document: server not running');
      return false;
    }

    const uriString = uri.toString();
    this.documentMap.set(uriString, documentData);
    try {
      // Send document data to the Node.js server
      await this.sendToServer('registerDocument', {
        uri: uriString,
        data: documentData
      });
      this.outputChannel.appendLine(`[Launcher] Document registered: ${uriString}`);
      return true;
    } catch (error: any) {
      this.outputChannel.appendLine(`[Launcher] Error registering document: ${error.message}`);
      return false;
    }
  }

  // Update a document on the server
  public async updateDocument(uri: vscode.Uri, documentData: any): Promise<boolean> {
    if (this.status !== ServerStatus.Running) {
      this.outputChannel.appendLine('[Launcher] Cannot update document: server not running');
      return false;
    }

    const uriString = uri.toString();
    this.documentMap.set(uriString, documentData);
    try {
      // Send updated document data to the Node.js server
      await this.sendToServer('updateDocument', {
        uri: uriString,
        data: documentData
      });
      this.outputChannel.appendLine(`[Launcher] Document updated: ${uriString}`);
      return true;
    } catch (error: any) {
      this.outputChannel.appendLine(`[Launcher] Error updating document: ${error.message}`);
      return false;
    }
  }

  // Get server port
  public getPort(): number {
    return this.port;
  }

  // Send data to the Node.js server
  private async sendToServer(endpoint: string, data: any): Promise<any> {
    if (!this.httpClient) {
      // Lazy-load the HTTP client
      const axios = require('axios');
      this.httpClient = axios.create({
        baseURL: `http://localhost:${this.port}`,
        timeout: 5000
      });
    }

    try {
      const response = await this.httpClient!.post(`/api/${endpoint}`, data);
      return response.data;
    } catch (error: any) {
      this.outputChannel.appendLine(`[Launcher] Server communication error: ${error.message}`);
      throw error;
    }
  }

  dispose() {
    this.outputChannel.appendLine('[Launcher] Disposing...');
    this.isDisposed = true;
    this.stopServer(); // Attempt graceful shutdown
    this.statusBarItem.dispose();
    this.outputChannel.dispose();
    // Ensure child process reference is cleared if stopServer is async or fails
    if (this.childProcess) {
      this.outputChannel.appendLine('[Launcher] Forcing kill during disposal.');
      this.childProcess.kill('SIGKILL'); // Force kill on dispose
      this.childProcess = undefined;
    }
    this.updateStatus(ServerStatus.Stopped, 'Disposed'); // Final status update
  }
}