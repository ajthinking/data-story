import { catchError, exhaustMap, filter, interval, Observable, of, Subscription } from 'rxjs';
import vscode, { type OutputChannel } from 'vscode';

export interface HealthCheckInfo {
  status: boolean,
  memory: { rss: number, heapTotal: number, heapUsed: number },
  cpu: { user: number, system: number }
}

export interface HealthCheckWithTime {
  info: HealthCheckInfo | null;
  durationMs: number;
}

// Define interface for constructor parameters
export interface DsServerHealthCheckerOptions {
  endpoint: string;
  intervalMs: number;
  slowThresholdMs: number;
  outputChannel: OutputChannel;
}

export class DsServerHealthChecker {
  private subscription?: Subscription;
  public health$: Observable<HealthCheckWithTime>;
  private endpoint: string;
  private intervalMs: number;
  private slowThresholdMs: number;
  private outputChannel: OutputChannel;
  private active = true;

  constructor(options: DsServerHealthCheckerOptions);
  constructor(
    endpoint: string, intervalMs: number, slowThresholdMs: number, outputChannel: OutputChannel,
  );
  constructor(
    endpointOrOptions: string | DsServerHealthCheckerOptions,
    intervalMs?: number,
    slowThresholdMs?: number,
    outputChannel?: OutputChannel,
  ) {
    // Handle both parameter patterns
    if (typeof endpointOrOptions === 'object') {
      // Object parameter pattern
      this.endpoint = endpointOrOptions.endpoint;
      this.intervalMs = endpointOrOptions.intervalMs;
      this.slowThresholdMs = endpointOrOptions.slowThresholdMs;
      this.outputChannel = endpointOrOptions.outputChannel;
    } else {
      // Individual parameters pattern
      this.endpoint = endpointOrOptions;
      this.intervalMs = intervalMs!;
      this.slowThresholdMs = slowThresholdMs!;
      this.outputChannel = outputChannel!;
    }
    this.health$ = interval(this.intervalMs).pipe(
      filter(() => this.active),
      exhaustMap(() => this.ping()),
      catchError(() => of({ info: null, durationMs: 0 })),
    );
  }

  activate() {
    this.active = true;
  }

  deactivate() {
    this.active = false;
  }

  /**
   * Perform a health check
   */
  async ping(): Promise<HealthCheckWithTime> {
    const start = performance.now();
    try {
      const response = await fetch(this.endpoint);
      const durationMs = performance.now() - start;
      if (!response.ok) {
        return { info: null, durationMs };
      }
      const info = (await response.json()) as HealthCheckInfo;
      return { info, durationMs };
    } catch (e) {
      const durationMs = performance.now() - start;
      this.outputChannel.appendLine(`[HEALTH] Health check failed: ${e}`);
      return { info: null, durationMs };
    }
  }

  formatHealthInfo(info: HealthCheckInfo): string {
    return `Status: ${info.status ? 'Healthy' : 'Unhealthy'}\n` +
      'Memory Usage:\n' +
      `  RSS: ${(info.memory.rss / 1024 / 1024).toFixed(2)} MB\n` +
      `  Heap Total: ${(info.memory.heapTotal / 1024 / 1024).toFixed(2)} MB\n` +
      `  Heap Used: ${(info.memory.heapUsed / 1024 / 1024).toFixed(2)} MB\n` +
      'CPU Usage (since process start):\n' +
      `  User: ${(info.cpu.user / 1000).toFixed(2)} ms\n` +
      `  System: ${(info.cpu.system / 1000).toFixed(2)} ms`;
  }

  start() {
    this.subscription = this.health$.subscribe(({ info, durationMs }) => {
      if (durationMs > this.slowThresholdMs) {
        if (info) {
          this.outputChannel.appendLine('[HEALTH]' + this.formatHealthInfo(info));
          this.outputChannel.appendLine(`[HEALTH] Request time: ${durationMs.toFixed(2)} ms`);
        }
        vscode.window.showWarningMessage('DataStory Server is slow or unresponsive', 'Open logs').then(open => {
          if (open) {
            this.outputChannel.show();
          }
        });
      }

      if (!info) {
        this.outputChannel.appendLine('[HEALTH] Health check failed');
        this.outputChannel.appendLine(`[HEALTH] Request time: ${durationMs.toFixed(2)} ms`);
      }
    });
  }

  dispose() {
    this.subscription?.unsubscribe();
  }
}
