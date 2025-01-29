import { when } from '../support/computerTester/ComputerTester';
import { Unique } from './Unique';

it('outputs unique values and duplicates', async () => {
  await when(Unique)
    .hasParams({
      property: 'i',
    })
    .getsInput([{ i: 1 }, { i: 1 }, { i: 2 }, { i: 3 }])
    .doRun()
    .expectOutputs({
      unique: [{ i: 2 }, { i: 3 }],
      duplicates: [{ i: 1 }, { i: 1 }],
    })
    .ok()
})