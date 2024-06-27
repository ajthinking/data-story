import { describe } from 'vitest';
import { createDiagram } from './signal_sleep_consoleLog';
import { firstValueFrom, lastValueFrom } from 'rxjs';

describe('signal_sleep_consoleLog', () => {
  it('test', async () => {
    const result = createDiagram();

    await lastValueFrom(result.events);
    // expect(result).toBe(undefined);
  })
})
