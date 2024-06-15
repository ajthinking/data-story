import { Element } from '../Element'
import { map } from 'rxjs/operators'

export const printer: Element = {
  name: 'printer',
  label: 'Printer',
  category: 'Watcher',
  inputs: ['input'],
  outputs: [],
  params: [],
  tags: [],
  boot: async ({ inputs }) => {
    inputs.input.subscribe({
      next: itemBatch => {
        console.log('Printer received batch:', itemBatch);
      },
      complete: () => {
        console.log('Printer complete.');
      }
    });
  },
}