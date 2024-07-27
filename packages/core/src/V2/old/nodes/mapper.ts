import { Element } from '../Element'
export const mapper: Element = {
  name: 'mapper',
  label: 'Mapper',
  category: 'Operator',
  inputs: ['input'],
  outputs: ['output'],
  params: [],

  boot: ({ inputs, outputs }) => {
    inputs.input.subscribe({
      next: itemBatch => {
        console.log('Mapper received batch:', itemBatch);

        outputs.output.next(
          itemBatch.map(item => ({
            ...item,
            mapped: true
          }))
        )
      },
      complete: () => {
        console.log('mapper received complete signal on "input".');
        console.log('mapper about to complete "output".')
        outputs.output.complete()
      }
    });
  },
}