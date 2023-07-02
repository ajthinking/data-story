import { when } from '../../support/computerTester/ComputerTester';
import { InstantThrow } from './InstantThrow';

it('throws immediately', async () => {
  await when(InstantThrow)
    .hasDefaultParams()
    .expectError("Instant Error!")
    .doRun()
    .ok()
})
