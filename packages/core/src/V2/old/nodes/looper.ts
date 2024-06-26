import { sleep } from '../../../utils/sleep';
import { Element } from '../Element'
import { concatMap } from 'rxjs';
export const looper: Element = {
  name: 'looper',
  label: 'Looper',
  category: 'Operator',
  inputs: ['input'],
  outputs: ['output'],
  params: [],
  tags: [],
  boot: ({ inputs, outputs }) => {
    inputs.input.pipe(
      concatMap(async item => {
        // await sleep(1000); // Simulate async operation
        return item;
      })
    ).subscribe({
      next: async itemBatch => {
        console.log('Looper received batch:', itemBatch);
        outputs.output.next(itemBatch)
      },
      complete: () => {
        console.log('looper received complete signal on "input".');
        console.log('looper about to complete "output".')
        outputs.output.complete()
      }
    });
  },
}