import { when } from '../../support/computerTester/ComputerTester';
import { Ignore } from './Ignore';

it('does nothing', async () => {
  await when(Ignore)
    .hasDefaultParams()
    .getsInput([{i: 1}, {i: 2}, {i: 3}])
    .doRun()
    .ok()
})
