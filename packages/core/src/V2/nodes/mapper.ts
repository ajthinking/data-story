import { Element } from '../Element'
import { map } from 'rxjs/operators'

export const mapper: Element = {
  name: 'mapper',
  label: 'Mapper',
  category: 'Operator',
  inputs: ['input'],
  outputs: ['output'],
  params: [],
  tags: [],
  boot: async ({ inputs, outputs }) => {
    inputs.input.subscribe({
      next: itemBatch => outputs.output.next(
        itemBatch.map(item => ({
          ...item,
          mapped: true
        }))
      ),
      complete: () => outputs.output.complete()
    });
  },
}