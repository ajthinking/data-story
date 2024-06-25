import { describe, expect, vi } from 'vitest';
import { LinkNodePorts } from './link';
import { firstValueFrom, interval, of, lastValueFrom } from 'rxjs';
import { Console } from './console';
import { take } from 'rxjs/operators';

describe('console', () => {
  it('should watch values from input node', async () => {
    const mockConsoleLog = vi.spyOn(console, 'log').mockImplementation((val) => {
      expect(val).toBe(1);
    });

    const inputPorts = new LinkNodePorts(of(1), 'input');
    const consoleNode = Console.boot();
    const watcher = consoleNode.watch(inputPorts);

    await firstValueFrom(watcher.events);

    expect(mockConsoleLog).toBeCalledTimes(1);
  });

  it('should watch multiple values from input node', async () => {
    let count = 0;
    const mockConsoleLog = vi.spyOn(console, 'log').mockImplementation((val) => {
      expect(val).toBe(count);
      count++;
    });

    const inputPorts = new LinkNodePorts(interval(100).pipe(take(3)), 'input');
    const consoleNode = Console.boot();
    const watcher = consoleNode.watch(inputPorts);

    await lastValueFrom(watcher.events);

    expect(mockConsoleLog).toBeCalledTimes(3);
  });
})
