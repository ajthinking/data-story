import { catchError, exhaustMap, interval, Observable, of, Subscription } from 'rxjs';
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

export class DsServerHealthChecker {
  private subscription?: Subscription;
  private health$: Observable<HealthCheckWithTime>;

  constructor(
    private endpoint: string, private intervalMs: number, private slowThresholdMs: number,
    private outputChannel: OutputChannel) {
    this.health$ = interval(this.intervalMs).pipe(
      exhaustMap(async () => {
        const start = performance.now();
        try {
          const response = await fetch(this.endpoint);
          const durationMs = performance.now() - start;
          if (!response.ok) {
            return { info: null, durationMs };
          }
          const info = (await response.json()) as HealthCheckInfo;
          return { info, durationMs };
        } catch(e) {
          const durationMs = performance.now() - start;
          this.outputChannel.appendLine(`[HEALTH] Health check failed: ${e}`);
          return { info: null, durationMs };
        }
      }),
      catchError(() => of({ info: null, durationMs: 0 })),
    );
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
        vscode.window.showWarningMessage('DataStory Server is slow or unresponsive', 'Open logs').then(open => {
          if (open) {
            this.outputChannel.show();
          }
        });
      }

      if (info) {
        this.outputChannel.appendLine('[HEALTH]' + this.formatHealthInfo(info));
        this.outputChannel.appendLine(`[HEALTH] Request time: ${durationMs.toFixed(2)} ms`);
      } else {
        this.outputChannel.appendLine('[HEALTH] Health check failed');
        this.outputChannel.appendLine(`[HEALTH] Request time: ${durationMs.toFixed(2)} ms`);
      }
    });
  }

  dispose() {
    this.subscription?.unsubscribe();
  }
}
