import * as vscode from 'vscode';
import * as cp from 'child_process';
import * as path from 'path';
import terminate from 'terminate/promise';
import { DsServerHealthChecker } from './dsServerHealthChecker';

// Define possible server states
enum ServerStatus {
  Stopped = 'Stopped',
  Starting = 'Starting',
  Running = 'Running',
  Stopping = 'Stopping',
  Error = 'Error'
}

export class ServerLauncher implements vscode.Disposable {
  public outputChannel: vscode.OutputChannel;
  private childProcess: cp.ChildProcess | undefined;
  private status: ServerStatus = ServerStatus.Stopped;
  private statusBarItem: vscode.StatusBarItem;
  private serverEntryPath: string;
  private port = 3300;
  private workspaceDir: string | undefined;
  private isDisposed = false;

  get serverEndpoint(): string {
    return `ws://localhost:${this.port}`;
  }

  private serverHealthChecker: DsServerHealthChecker;

  constructor(context: vscode.ExtensionContext) {
    // Resolve the path to the nodejs package
    this.serverEntryPath = path.join(context.extensionPath, 'install-scripts');
    // todo: replace with published nodejs package

    // Create VS Code UI elements
    this.statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
    this.outputChannel = vscode.window.createOutputChannel('DataStory Server'); // Dedicated output channel

    this.updateStatus(ServerStatus.Stopped);
    this.statusBarItem.show();

    // Register for disposal with object parameter pattern
    this.serverHealthChecker = new DsServerHealthChecker({
      endpoint: `http://localhost:${this.port}/health`,
      intervalMs: 5000,
      slowThresholdMs: 3000,
      outputChannel: this.outputChannel,
    });
    // Register for disposal
    context.subscriptions.push(this,
      this.serverHealthChecker);
  }

  /**
   *Starts the DataStory Node.js server process.
   *
   *This method:
   *1. Prepares the server entry point by ensuring dependencies are installed
   *2. Validates workspace path availability
   *3. Spawns a Node.js child process with the server entry point
   *4. Sets up event listeners for stdout, stderr, errors, and process exit
   *5. Starts the health checker to monitor server responsiveness
   *
   *@returns Promise that resolves when the server process has been started (not when it's ready)
   */
  public async startServer(): Promise<void> {
    await this.prepareServerEntry();
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
    this.outputChannel.appendLine(`[Launcher] Starting server from: ${this.serverEntryPath}`);
    this.outputChannel.appendLine(`[Launcher] Config: Port=${this.port}, Workspace=${this.workspaceDir}`);

    try {
      const nodeCmd = 'node';
      // We need to modify the test-server.ts file to use our port before running the watch:server script
      const serverEntry = path.join(this.serverEntryPath, 'ds-server.min.js');

      // Get additional argument from VSCode settings
      const additionalDsServer = vscode.workspace.getConfiguration('datastory')
        .get<string[]>('additionalDsServerCliArgs') || [];

      // First, let's check if the file exists
      const args = [
        ...additionalDsServer,
        serverEntry, '-p', this.port.toString(), '-w', this.workspaceDir,
      ];
      this.outputChannel.appendLine(`[Launcher] Running command: ${nodeCmd} ${args.join(' ')}`);
      this.childProcess = cp.spawn(
        nodeCmd,
        args,
        {
          stdio: [ 'pipe', 'pipe', 'pipe' ], // Pipe stdin, stdout, stderr
          shell: false,
          env: { ...process.env }, // Inherit parent environment
        },
      );

      this.childProcess.stdout?.on('data', (data) => {
        const message = data.toString();
        this.outputChannel.append(`[Server] ${message}`); // Log stdout
        if (message.includes('Server started')) {
          vscode.window.showInformationMessage('Server started at: ' + this.serverEndpoint);
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
      this.serverHealthChecker!.start();
    } catch (error: any) {
      this.outputChannel.appendLine(`[Launcher CATCH] Error spawning server: ${error.message}`);
      vscode.window.showErrorMessage(`Error launching server: ${error.message}`);
      this.handleServerExit(null, 'catch');
    }
  }

  /**
   *Stops the running DataStory server process.
   *
   *This method:
   *1. Checks if the server is currently running
   *2. Updates the server status to 'Stopping'
   *3. Sends a termination signal to the child process
   *4. The actual shutdown is handled by the 'close' event listener in startServer()
   *
   *@returns Promise that resolves when the stop command has been issued (not when server is fully stopped)
   */
  public async stopServer(): Promise<void> {
    this.updateStatus(ServerStatus.Stopping);
    this.outputChannel.appendLine('[Launcher] Attempting to stop server process (SIGTERM)...');

    await this.terminateServer();
  }

  private async terminateServer(): Promise<void> {
    if (this.childProcess && this.childProcess.pid) {
      // write '<exit>/n' to stdin
      this.childProcess.stdin?.write('<exit>\n');
      // Use the terminate package in case of https://github.com/volta-cli/volta/issues/36
      await terminate(this.childProcess.pid);
    }
  }

  /**
   *Restarts the DataStory server process.
   *
   *This method:
   *1. If server is running, stops it and sets up a one-time listener to start it again after shutdown
   *2. If server is not running, starts it immediately
   *
   *@returns Promise that resolves when the restart command has been processed
   */
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

  /**
   *Prepares the server entry point by ensuring required dependencies are installed.
   *
   *This method:
   *1. Executes the prepare-ds-server.js script in dry-run mode to check dependencies
   *2. If dependencies are missing, prompts the user to install them
   *3. Executes the installation if the user agrees
   *
   *@private
   */
  private async prepareServerEntry() {
    const prepareScript = path.join(this.serverEntryPath, 'prepare-ds-server.js');
    const prepareCmd = 'node';
    const stdout = cp.execSync(`${prepareCmd} ${prepareScript} --dry-run`);
    const output = stdout.toString().trim();
    this.outputChannel.appendLine(`[Launcher] ${output}`);
    if (output.includes('not found')) {
      const selection = await vscode.window.showInformationMessage(
        '@duckdb/node-api is required to run the server with DuckDB storage. Would you like to install it now?',
        'Yes',
        'Later, I\'ll do it myself',
      );
      if (selection === 'Yes') {
        cp.spawn(`${prepareCmd} ${prepareScript}`, { stdio: 'inherit', cwd: this.serverEntryPath, shell: true });
      }
    }
  }

  /**
   *Handles the server process exit event.
   *
   *This method:
   *1. Updates the server status based on exit code and signal
   *2. Shows appropriate notifications for unexpected exits
   *3. Cleans up process listeners and references
   *4. Disposes of the health checker
   *
   *@param code - The exit code from the process (null if process was terminated by signal)
   *@param signal - The signal that caused the exit (null if process exited normally)
   *@private
   */
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
    this.serverHealthChecker?.dispose();
  }

  /**
   *Updates the server status and reflects it in the VS Code status bar.
   *
   *This method:
   *1. Updates the internal status state
   *2. Sets appropriate status bar text, tooltip, and command based on the new status
   *3. Logs the status change to the output channel
   *
   *@param newStatus - The new server status
   *@param details - Optional details about the status change
   *@private
   */
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

  /**
   *Gets the path of the first workspace folder.
   *
   *@returns The filesystem path of the first workspace folder, or undefined if no workspace is open
   *@private
   */
  private getWorkspacePath(): string | undefined {
    // Return the path of the first workspace folder
    const folders = vscode.workspace.workspaceFolders;
    if (folders && folders.length > 0) {
      return folders[0].uri.fsPath;
    }
    return undefined;
  }

  /**
   *Implements vscode.Disposable interface.
   *Cleans up resources when the extension is deactivated.
   *
   *This method:
   *1. Marks the launcher as disposed
   *2. Attempts to gracefully stop the server
   *3. Disposes of UI components (status bar, output channel)
   *4. Forces termination of the child process if necessary
   *5. Updates the final status
   */
  dispose() {
    this.terminateServer();
    this.statusBarItem.dispose();
    this.outputChannel.dispose();
    this.isDisposed = true;
  }
}
