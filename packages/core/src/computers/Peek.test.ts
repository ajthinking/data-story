import { when } from '../support/computerTester/ComputerTester';
import { Peek } from './Peek';

it('register one peek hook per batch', async () => {
  await when(Peek)
    .hasDefaultParams()
    .getsInput([{ id: 1 }, { id: 2 }])
    .doRun()
    .expectHooks([
      {
        type: 'PEEK',
        args: ['Peek.1', [{ id: 1 }, { id: 2 }]]
      },
    ])
    .ok()
})