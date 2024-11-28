import { when } from '../support/computerTester/ComputerTester';
import { ConsoleLog } from './ConsoleLog';

it('register one console log per item', async () => {
  await when(ConsoleLog)
    .hasDefaultParams()
    .getsInput([{ id: 1 }, { id: 2 }])
    .doRun()
    .ok()
})

it('can register an interpolated console log message', async () => {
  await when(ConsoleLog)
    .hasParams({
      message: 'Hello ${name}!'
    })
    .getsInput([{ id: 1, name: 'ajthinking' }])
    .doRun()
    .ok()
})
