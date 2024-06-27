import { describe } from 'vitest';
import { signal_sleep_consoleLog } from './signal_sleep_consoleLog';
import { firstValueFrom, lastValueFrom } from 'rxjs';

describe('signal_sleep_consoleLog', () => {
  it('test', async () => {
    const result = signal_sleep_consoleLog();

    await lastValueFrom(result.events);
    // expect(result).toBe(undefined);
  })
})
