import * as vscode from 'vscode';
import * as cp from 'child_process';
import * as path from 'path';
import terminate from 'terminate';

// Define possible server states
enum ServerStatus {
  Stopped = 'Stopped',
  Starting = 'Starting',
  Running = 'Running',
  Stopping = 'Stopping',
  Error = 'Error'
}

export class ServerLauncher implements vscode.Disposable {
  private childProcess: cp.ChildProcess | undefined;
  private status: ServerStatus = ServerStatus.Stopped;
  private statusBarItem: vscode.StatusBarItem;
  private outputChannel: vscode.OutputChannel;
  private nodejsPackagePath: string;
  private port = 3300; // Example: Default port, make this configurable later
  private workspaceDir: string | undefined;
  private isDisposed = false;
  private readonly extensionContext: vscode.ExtensionContext;

  get serverEndpoint(): string {
    return `ws://localhost:${this.port}`;
  }

  constructor(context: vscode.ExtensionContext) {
    this.extensionContext = context;
    // todo: replace with published nodejs package
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

    this.workspaceDir = this.getWorkspacePath();
    if (!this.workspaceDir) {
      vscode.window.showErrorMessage('Cannot start server: No workspace folder is open.');
      this.updateStatus(ServerStatus.Error, 'No workspace');
      return;
    }

    this.updateStatus(ServerStatus.Starting);
    this.outputChannel.appendLine(`[Launcher] Starting server from: ${this.nodejsPackagePath}`);
    this.outputChannel.appendLine(`[Launcher] Config: Port=${this.port}, Workspace=${this.workspaceDir}`);

    try {
      const nodeCmd = 'node';
      // We need to modify the test-server.ts file to use our port before running the watch:server script
      const serverEntry = path.join(this.nodejsPackagePath, 'dist', 'ds-server.js');

      // First, let's check if the file exists
      this.childProcess = cp.spawn(
        nodeCmd,
        [
          '--max_old_space_size=10240',
          serverEntry, '-p', this.port.toString(), '-w', this.workspaceDir,
        ],
        {
          stdio: [ 'pipe', 'pipe', 'pipe' ], // Pipe stdin, stdout, stderr
          shell: false,
          env: { ...process.env }, // Inherit parent environment
        },
      );

      // todo: add health check
      this.childProcess.stdout?.on('data', (data) => {
        const message = data.toString();
        this.outputChannel.append(message); // Log stdout
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
    this.outputChannel.appendLine('[Launcher] Attempting to stop server process (SIGTERM)...');

    // Use the terminate package in case of https://github.com/volta-cli/volta/issues/36
    terminate(this.childProcess.pid!);
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
      } else {
        this.updateStatus(ServerStatus.Stopped);
      }
    } else if (this.isDisposed) {
      this.updateStatus(ServerStatus.Stopped, 'Disposed'); // Ensure final state is Stopped on dispose
    } else {
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
    let statusBarCommand: string | undefined;
    let statusBarTooltip = `DataStory Server: ${newStatus}`;
    if (details) {
      statusBarTooltip += ` (${details})`;
    }

    switch (newStatus) {
      case ServerStatus.Stopped:
        statusBarText = 'Stopped';
        statusBarCommand = 'datastory.startServer'; // Command to start
        break;
      case ServerStatus.Starting:
        statusBarText = 'Starting';
        statusBarCommand = undefined; // No action while starting
        break;
      case ServerStatus.Running:
        statusBarText = 'Running';
        statusBarCommand = 'datastory.restartServer'; // Command to restart
        break;
      case ServerStatus.Stopping:
        statusBarText = 'Stopping';
        statusBarCommand = undefined;
        break;
      case ServerStatus.Error:
        statusBarText = 'Error';
        statusBarCommand = 'datastory.startServer'; // Command to try starting again
        break;
    }

    this.statusBarItem.text = `DataStory: ${statusBarText}`;
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

  dispose() {
    this.outputChannel.appendLine('[Launcher] Disposing...');
    this.isDisposed = true;
    this.stopServer(); // Attempt graceful shutdown
    this.statusBarItem.dispose();
    this.outputChannel.dispose();
    // Ensure child process reference is cleared if stopServer is async or fails
    if (this.childProcess) {
      this.outputChannel.appendLine('[Launcher] Forcing kill during disposal.');
      this.childProcess = undefined;
    }
    this.updateStatus(ServerStatus.Stopped, 'Disposed'); // Final status update
  }
}
