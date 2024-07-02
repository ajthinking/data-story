import { describe, expect, vi } from 'vitest';
import { signal_sleep_consoleLog } from './signal_sleep_consoleLog';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import * as logWithTimeDefault from '../../utils/logWithTime';

describe('signal_sleep_consoleLog', () => {
  it('should observe the result when the expression is i×10', async () => {
    let count = 0;
    const mockLog = vi.spyOn(logWithTimeDefault, 'logWithTime').mockImplementation((val) => {
      expect(val).toBe(count * 10);
      count++;
    });
    const result = signal_sleep_consoleLog({
      period: 10,
      count: 3,
      expression: (i: number) => i * 10 });

    await lastValueFrom(result.events);
    expect(mockLog).toBeCalledTimes(3);
  })
})
