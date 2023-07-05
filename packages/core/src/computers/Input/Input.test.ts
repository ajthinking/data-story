import { when } from '../../support/computerTester/ComputerTester';
import { Input } from './Input';

it.todo('todo', async () => {
  await when(Input)
    .hasDefaultParams()
    .getsInput([{i: 1}, {i: 2}])
    .doRun()
    .expectOutput([{i: 1}, {i: 2}])
    .getsInput([{i: 3}, {i: 4}])
    .doRun()
    .expectOutput([{i: 1}, {i: 2}, {i: 3}, , {i: 4}])
    .ok()
})