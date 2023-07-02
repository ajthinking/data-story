import { when } from '../../support/computerTester/ComputerTester';
import { Comment } from './Comment';

it('does nothing', async () => {
  await when(Comment)
    .hasDefaultParams()
    .doRun()
    .ok()
})
