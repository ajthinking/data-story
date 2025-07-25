import * as vscode from 'vscode';
import * as cp from 'child_process';
import * as path from 'path';
import { DsServerHealthChecker } from './dsServerHealthChecker';
import { BehaviorSubject, filter, firstValueFrom, mergeWith, switchMap } from 'rxjs';
import { DataStoryServerStatusBarItem, ServerStatus } from './DataStoryServerStatusBarItem';
import { toDisposable } from './utils/vscode-rxjs';
import { getDsExtConfig } from './utils/DsExtConfig';
import { ExternalProcessServer, ExternalProcessServerOptions } from './ExternalProcessServer';
import { AbstractServer } from './AbstractServer';
import { InProcessServer } from './InProcessServer';

export class ServerLauncher implements vscode.Disposable {
  public outputChannel: vscode.OutputChannel;
  private $status = new BehaviorSubject(ServerStatus.Stopped);
  private readonly serverEntryPath: string;
  private workspaceDir: string | undefined;
  private isDisposed = false;
  private readonly statusBarItem: DataStoryServerStatusBarItem;
  private readonly serverHealthChecker: DsServerHealthChecker;
  private externalProcessServer: AbstractServer | undefined;

  constructor(context: vscode.ExtensionContext) {
    // Resolve the path to the ds-server module
    this.serverEntryPath = path.join(context.extensionPath, 'install-scripts');

    // Create VS Code UI elements
    this.outputChannel = vscode.window.createOutputChannel('DataStory Server'); // Dedicated output channel

    this.updateStatus(ServerStatus.Stopped);

    // Register for disposal with object parameter pattern
    this.serverHealthChecker = new DsServerHealthChecker({
      endpoint: `http://localhost:${this.port}/health`,
      intervalMs: 5000,
      slowThresholdMs: 3000,
      outputChannel: this.outputChannel,
    });
    // Create status bar item
    this.statusBarItem = new DataStoryServerStatusBarItem(
      this.$status,
      (status) => {
        console.log(`serverHealthChecker ${this.serverHealthChecker}`);
        if (status === ServerStatus.Running) {
          this.serverHealthChecker.activate();
          void vscode.window.showInformationMessage('Server started at: ' + this.serverEndpoint);
        } else if (status === ServerStatus.Error) {
          void vscode.window.showInformationMessage('Server stopped unexpectedly');
          this.serverHealthChecker.deactivate();
          this.statusBarItem.updateTooltip('Server stopped unexpectedly, Click to start server');
        } else if (status === ServerStatus.Stopped || status === ServerStatus.Stopping) {
          this.serverHealthChecker.deactivate();
          this.statusBarItem.updateTooltip('Click to start server');
        }
      },
    );
    const liveUpdateServerStatus =
      this.$status.pipe(
        filter(it => it === ServerStatus.Running),
        switchMap(() => this.serverHealthChecker.health$.pipe(
          mergeWith(this.serverHealthChecker.ping()),
        )),
      ).subscribe(health => {
        const tooltip = [ `Server running at ${this.serverEndpoint}` ];
        if (health.info) {
          tooltip.push(this.serverHealthChecker.formatHealthInfo(health.info));
        }
        this.statusBarItem.updateTooltip(tooltip.join('\n'));
      });
    // Register for disposal
    context.subscriptions.push(
      this,
      this.serverHealthChecker,
      this.statusBarItem,
      toDisposable(liveUpdateServerStatus),
    );
  }

  get serverEndpoint(): string {
    return `ws://localhost:${this.port}`;
  }

  // Get port from configuration
  private get port(): number {
    return getDsExtConfig().dsServerPort;
  }

  ensureStarted() {
    return firstValueFrom(this.$status.pipe(
      filter(it => it === ServerStatus.Running),
    ));
  }

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
      const config = getDsExtConfig();
      const options: ExternalProcessServerOptions = {
        nodeCmd: 'node',
        serverEntryPath: this.serverEntryPath,
        dsExtConfig: config,
        workspaceDir: this.workspaceDir,
        outputChannel: this.outputChannel,
        onStatusUpdate: (status: ServerStatus, details?: string) => {
          this.updateStatus(status, details);
        },
        onServerExit: (code: number | null, signal: NodeJS.Signals | string | null) => {
          this.handleServerExit(code, signal);
        },
      };
      this.externalProcessServer =
        config.useExternalServer
          ? new ExternalProcessServer(options)
          : new InProcessServer(options);
      this.externalProcessServer.start();
      this.serverHealthChecker.start();
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
    try {
      this.updateStatus(ServerStatus.Stopping);
      this.outputChannel.appendLine('[Launcher] Attempting to stop server process (SIGTERM)...');

      await this.externalProcessServer?.stop();
    } catch (e) {
      if (this.$status.value === ServerStatus.Stopped) {
        // ignore
      } else {
        this.outputChannel.appendLine(`[Launcher ERROR] Failed to stop server process: ${e}`);
      }
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
    if (this.externalProcessServer) {
      // If running, stop it first. Listen for close event before starting again.
      await this.stopServer();
      await this.startServer();
    } else {
      // If not running, just start it.
      await this.startServer();
    }
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
    void this.terminateServer();
    this.statusBarItem.dispose();
    this.outputChannel.dispose();
    this.isDisposed = true;
  }

  private async terminateServer(): Promise<void> {
    if (this.externalProcessServer) {
      await this.externalProcessServer.stop();
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
    if (this.$status.value !== ServerStatus.Stopping && !this.isDisposed) {
      if (code !== 0 && code !== null) {
        // Non-zero exit code usually indicates an error
        void vscode.window.showErrorMessage(`Server stopped unexpectedly (code ${code}, signal ${signal}). Check Output channel.`);
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
    this.externalProcessServer = undefined;
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
    this.$status.next(newStatus);
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
}
