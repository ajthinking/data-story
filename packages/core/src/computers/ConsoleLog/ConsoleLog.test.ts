import { when } from '../../support/computerTester/ComputerTester';
import { ConsoleLog } from './ConsoleLog';

it('register one console log hook per item', async () => {
  await when(ConsoleLog)
    .hasDefaultParams()
    .getsInput([{ id: 1 }, { id: 2 }])
    .doRun()
    .expectHooks([
      {
        type: 'CONSOLE_LOG',
        args: [{ id: 1 }]
      },
      {
        type: 'CONSOLE_LOG',
        args: [{ id: 2 }]
      },
    ])
    .ok()
})

it('can register an interpolated console log message', async () => {
  await when(ConsoleLog)
    .hasParams({
      message: 'Hello ${name}!'
    })
    .getsInput([{ id: 1, name: 'ajthinking' }])
    .doRun()
    .expectHooks([
      {
        type: 'CONSOLE_LOG',
        args: ['Hello ajthinking!']
      },
    ])
    .ok()
})
