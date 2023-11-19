import { when } from '../../support/computerTester/ComputerTester';
import { Input } from './Input';

it('can can run without any input passed', async () => {
  await when(Input)
    .hasDefaultParams()
    .ok()
})