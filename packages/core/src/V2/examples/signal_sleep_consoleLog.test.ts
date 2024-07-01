import { describe, expect, vi } from 'vitest';
import { signal_sleep_consoleLog, signal_sleep_consoleLog_multiple } from './signal_sleep_consoleLog';
import * as logWithTimeDefault from '../../utils/logWithTime';

describe('signal_sleep_consoleLog', () => {
  it('signal_sleep_consoleLog: should observe the result when the expression is i×10', async() => {
    let count = 0;
    const mockLog = vi.spyOn(logWithTimeDefault, 'logWithTime').mockImplementation((val) => {
      expect(val).toBe(count * 10);
      console.warn(val);
      count++;
    });

    await signal_sleep_consoleLog({
      period: 10,
      count: 3,
      expression: (i: number) => i * 10
    });

    expect(mockLog).toBeCalledTimes(3);
  })

  it('signal_sleep_consoleLog_multiple: should observe the result when the expression is i+1', async() => {
    let result: number[] = [];
    const mockLog = vi.spyOn(logWithTimeDefault, 'logWithTime').mockImplementation((val) => {
      console.warn(val);
      result.push(val as number);
    });

    await signal_sleep_consoleLog_multiple({
      period: 10,
      count: 3,
      expression: (i: number) => i + 1
    });

    result.sort((a, b) => a - b);
    expect(mockLog).toBeCalledTimes(9);
    expect(result).toEqual([1, 1, 1, 2, 2, 2, 3, 3, 3]);
  })
})
