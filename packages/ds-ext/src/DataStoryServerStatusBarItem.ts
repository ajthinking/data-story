import * as vscode from 'vscode';
import { BehaviorSubject, Subscription } from 'rxjs';
import { DataStoryCommands } from './vscode-commands';

// Re-export the ServerStatus enum to avoid circular dependencies
export enum ServerStatus {
  Stopped = 'Stopped',
  Starting = 'Starting',
  Running = 'Running',
  Stopping = 'Stopping',
  Error = 'Error'
}

export class DataStoryServerStatusBarItem implements vscode.Disposable {
  private statusBarItem: vscode.StatusBarItem;
  private subscription: Subscription;

  /**
   * Update the tooltip text of the status bar item
   * @param tooltip The tooltip text to display
   */
  updateTooltip(tooltip: string): void {
    this.statusBarItem.tooltip = tooltip;
  }

  constructor(
    private $status: BehaviorSubject<ServerStatus>,
    private onStatusUpdated: (status: ServerStatus) => void,
  ) {
    this.statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
    this.statusBarItem.show();

    this.subscription = this.$status.subscribe(status => {
      this.updateStatusBar(status);
      this.onStatusUpdated(status);
    });
  }

  private updateStatusBar(status: ServerStatus): void {
    this.statusBarItem.text = `DataStory Server: ${status}`;

    switch (status) {
      case ServerStatus.Stopped:
        this.statusBarItem.command = DataStoryCommands.StartServer;
        this.statusBarItem.tooltip = 'Click to start server';
        break;
      case ServerStatus.Starting:
        this.statusBarItem.command = undefined;
        this.statusBarItem.tooltip = 'Starting server...';
        break;
      case ServerStatus.Running:
        this.statusBarItem.command = DataStoryCommands.ShowOutput;
        this.statusBarItem.tooltip = 'Server running';
        break;
      case ServerStatus.Stopping:
        this.statusBarItem.command = undefined;
        this.statusBarItem.tooltip = 'Stopping server...';
        break;
      case ServerStatus.Error:
        this.statusBarItem.command = DataStoryCommands.RestartServer;
        this.statusBarItem.tooltip = 'Click to start server';
        break;
    }
  }

  dispose(): void {
    this.subscription.unsubscribe();
    this.statusBarItem.dispose();
  }
}
