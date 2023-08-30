import { when } from '../../support/computerTester/ComputerTester';
import { AskChatGpt } from './AskChatGpt';

it.todo('does something', async () => {
  await when(AskChatGpt)
    .hasDefaultParams()
    .getsInput([{i: 1}, {i: 2}])
    .doRun()
    .expectOutput([{i: 1}, {i: 2}])
    .getsInput([{i: 3}, {i: 4}])
    .doRun()
    .expectOutput([{i: 1}, {i: 2}, {i: 3}, , {i: 4}])
    .ok()
})
