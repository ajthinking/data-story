import { DsExtConfig } from './utils/DsExtConfig';
import * as vscode from 'vscode';
import * as cp from 'child_process';
import * as path from 'path';
import { ServerStatus } from './DataStoryServerStatusBarItem';
import terminate from 'terminate/promise';
import { AbstractServer, BaseServerOptions } from './AbstractServer';

export interface ExternalProcessServerOptions extends BaseServerOptions {
  nodeCmd: string,
}

export class ExternalProcessServer implements AbstractServer {
  private childProcess: cp.ChildProcess | undefined;

  constructor(private options: ExternalProcessServerOptions) {
  }

  start() {
    this.options.outputChannel.appendLine(`[Launcher] Starting server from: ${this.options.serverEntryPath}`);
    this.options.outputChannel.appendLine(`[Launcher] Config: Port=${this.options.dsExtConfig.dsServerPort}, Workspace=${this.options.workspaceDir}`);

    try {
      const nodeCmd = 'node';
      // We need to modify the test-server.ts file to use our port before running the watch:server script
      const serverEntry = path.join(this.options.serverEntryPath, 'ds-server.min.js');

      // Get additional arguments from configuration
      const additionalDsServer = this.options.dsExtConfig.additionalDsServerCliArgs || [];

      // First, let's check if the file exists
      const args = [
        ...additionalDsServer,
        serverEntry, '-p', this.options.dsExtConfig.dsServerPort.toString(), '-w', this.options.workspaceDir,
      ];
      this.options.outputChannel.appendLine(`[Launcher] Running command: ${nodeCmd} ${args.join(' ')}`);
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
        this.options.outputChannel.append(`[Server] ${message}`); // Log stdout
        if (message.includes('Server started')) {
          this.options.onStatusUpdate(ServerStatus.Running);
        }
      });

      this.childProcess.stderr?.on('data', (data) => {
        const message = data.toString();
        this.options.outputChannel.appendLine(`[Server ERROR] ${message}`); // Log stderr
        // Optionally show error message immediately, or wait for exit code
        // vscode.window.showErrorMessage(`Server error: ${message.substring(0, 100)}...`);
        // Consider setting status to Error only on non-zero exit or specific errors
      });

      this.childProcess.on('error', (err) => {
        this.options.outputChannel.appendLine(`[Launcher ERROR] Failed to start server process: ${err.message}`);
        vscode.window.showErrorMessage(`Failed to start server: ${err.message}`);
        this.options.onServerExit(null, 'error'); // Treat launch error as an exit
      });

      this.childProcess.on('close', (code, signal) => {
        this.options.outputChannel.appendLine(`[Launcher] Server process exited with code ${code}, signal ${signal}.`);
        this.options.onServerExit(code, signal);
      });
    } catch (error: any) {
      this.options.outputChannel.appendLine(`[Launcher CATCH] Error spawning server: ${error.message}`);
      vscode.window.showErrorMessage(`Error launching server: ${error.message}`);
      this.options.onServerExit(null, 'catch');
    }
  }

  async stop(): Promise<void> {
    if (this.childProcess && this.childProcess.pid) {
      // write '<exit>/n' to stdin
      this.childProcess.stdin?.write('<exit>\n');
      // Use the terminate package in case of https://github.com/volta-cli/volta/issues/36
      await terminate(this.childProcess.pid);
    }
  }
}
