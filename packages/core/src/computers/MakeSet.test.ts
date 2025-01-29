import { when } from '../support/computerTester/ComputerTester';
import { MakeSet } from './MakeSet';

it('outputs unique items based on property value', async () => {
  await when(MakeSet)
    .hasParams({ property: 'name' })
    .getsInput([
      { value: { name: 'John', age: 30 } },
      { value: { name: 'Jane', age: 25 } },
      { value: { name: 'John', age: 40 } },
    ])
    .doRun()
    .expectOutputs({
      output: [
        { name: 'John' },
        { name: 'Jane' },
      ],
    })
    .ok();
});
