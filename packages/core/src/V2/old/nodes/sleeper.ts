import { sleep } from '../../../utils/sleep';
import { Element } from '../Element'
export const sleeper: Element = {
  name: 'sleeper',
  label: 'Sleeper',
  category: 'Operator',
  inputs: ['input'],
  outputs: ['output'],
  params: [],
  tags: [],
  boot: async ({ inputs, outputs }) => {
    inputs.input.subscribe({
      next: async itemBatch => {
        await sleep(1000);
        outputs.output.next(itemBatch);
      },
      complete: () => {
        // Completing here forego next sleep promise..
        outputs.output.complete();
      }
    });
  },
}