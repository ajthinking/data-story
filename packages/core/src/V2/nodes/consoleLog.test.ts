import { describe, expect, vi } from 'vitest';
import { LinkElementPorts } from './link';
import { firstValueFrom, interval, of, lastValueFrom } from 'rxjs';
import { consoleLog } from './consoleLog';
import { take } from 'rxjs/operators';

describe('consoleLog', () => {
  it('should watch values from input node', async () => {
    const mockConsoleLog = vi.spyOn(console, 'log').mockImplementation((val) => {
      expect(val).toBe(1);
    });

    const inputPorts = new LinkElementPorts(of(1), 'input');
    const consoleNode = consoleLog.boot();
    const watcher = consoleNode.watch(inputPorts);

    await firstValueFrom(watcher.events);

    expect(mockConsoleLog).toBeCalledTimes(1);
  });

  it('should watch multiple values from input node', async () => {
    let count = 0;
    const mockConsoleLog = vi.spyOn(console, 'log').mockImplementation((val) => {
      expect(val).toBe(count++);
    });

    const inputPorts = new LinkElementPorts(interval(100).pipe(take(3)), 'input');
    const consoleNode = consoleLog.boot();
    const watcher = consoleNode.watch(inputPorts);

    await lastValueFrom(watcher.events);

    expect(mockConsoleLog).toBeCalledTimes(3);
  });
})
