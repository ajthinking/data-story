import { when } from '../support/computerTester/ComputerTester';
import { Await } from './Await';

it('outputs an item through no_items when no input', async () => {
  await when(Await)
    .hasParams({ number_of_items: 1 })
    .getsInputs({
      input: []
    })
    .doRun()
    .expectOutputs({
      output: [],
      no_items: [
        { message: 'No items available to await node.'}
      ]
    })
    .ok()
})
