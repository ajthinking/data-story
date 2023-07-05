import { when } from '../../support/computerTester/ComputerTester';
import { Pass } from './Pass';

it('outputs the input ontouched', async () => {
  await when(Pass)
    .hasDefaultParams()
    .getsInput([{i: 1}, {i: 2}])
    .doRun()
    .expectOutput([{i: 1}, {i: 2}])
    .getsInput([{i: 3}, {i: 4}])
    .doRun()
    .expectOutput([{i: 1}, {i: 2}, {i: 3}, {i: 4}])
    .ok()
})