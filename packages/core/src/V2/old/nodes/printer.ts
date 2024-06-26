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
  boot: ({ inputs }) => {
    inputs.input.subscribe({
      next: itemBatch => {
        console.log('Printer received batch:', itemBatch);
        console.log('PRINTING:', itemBatch);
      },
      complete: () => {
        console.log('printer received complete signal on "input".');
        // No ports to propagate complete signal to.
      }
    });
  },
}