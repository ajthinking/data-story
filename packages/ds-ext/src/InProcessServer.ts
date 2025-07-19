import { AbstractServer, BaseServerOptions } from './AbstractServer';
import { ServerStatus } from './DataStoryServerStatusBarItem';
import * as path from 'path';

export class InProcessServer implements AbstractServer {
  private abortController: AbortController | undefined;
  private serverPromise: Promise<void> | undefined;

  constructor(private options: BaseServerOptions) {
  }

  start(): void {
    this.options.outputChannel.appendLine(`[InProcess] Starting in-process server from: ${this.options.serverEntryPath}`);
    this.options.outputChannel.appendLine(`[InProcess] Config: Port=${this.options.dsExtConfig.dsServerPort}, Workspace=${this.options.workspaceDir}`);

    try {
      this.options.onStatusUpdate(ServerStatus.Starting);

      // Create abort controller for graceful shutdown
      this.abortController = new AbortController();

      // Start the server asynchronously
      this.serverPromise = this.startServerAsync();
    } catch (error: any) {
      this.options.outputChannel.appendLine(`[InProcess CATCH] Error starting in-process server: ${error.message}`);
      this.options.onStatusUpdate(ServerStatus.Error, error.message);
      this.options.onServerExit(null, 'error');
    }
  }

  private async startServerAsync(): Promise<void> {
    try {
      // Resolve the server entry path to the mjs file
      const serverEntryMjs = path.join(this.options.serverEntryPath, 'ds-server.min.js');

      this.options.outputChannel.appendLine(`[InProcess] Importing server module from: ${serverEntryMjs}, ${import.meta.resolve?.(serverEntryMjs)}`);

      // Dynamically import the mjs module
      const serverModule = await import(serverEntryMjs);

      if (!serverModule.startServer || typeof serverModule.startServer !== 'function') {
        throw new Error('startServer function not found in the server module');
      }

      // Call startServer with the abort signal and configuration
      await serverModule.startServer({
        port: this.options.dsExtConfig.dsServerPort,
        workingDir: this.options.workspaceDir,
        abortSignal: this.abortController!.signal,
      });
      this.options.onStatusUpdate(ServerStatus.Running);
    } catch (error: any) {
      if (error.name === 'AbortError') {
        this.options.outputChannel.appendLine('[InProcess] Server was aborted');
        this.options.onServerExit(0, 'SIGTERM');
      } else {
        this.options.outputChannel.appendLine(`[InProcess ERROR] Server error: ${error.message}`);
        this.options.onStatusUpdate(ServerStatus.Error, error.message);
        this.options.onServerExit(1, null);
      }
    }
  }

  async stop(): Promise<void> {
    if (this.abortController) {
      this.options.outputChannel.appendLine('[InProcess] Stopping in-process server...');
      this.abortController.abort();

      // Wait for the server to finish shutting down
      if (this.serverPromise) {
        try {
          await this.serverPromise;
        } catch (error) {
          // Expected if aborted
        }
      }

      this.abortController = undefined;
      this.serverPromise = undefined;
    }
    this.options.outputChannel.appendLine('[InProcess] In-process server stopped');
    this.options.onStatusUpdate(ServerStatus.Stopped);
  }
}
