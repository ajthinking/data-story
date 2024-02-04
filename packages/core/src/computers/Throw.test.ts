import { when } from '../support/computerTester/ComputerTester';
import { Throw } from './Throw';

it('throws with a default message', async () => {
  await when(Throw)
    .hasDefaultParams()
    .getsInput([{i: 1}])
    .expectError('Some error\nThrown in node Throw.1')
    .doRun()
    .ok()
})
