import { Element } from '../Element'
export const input: Element = {
  name: 'input',
  label: 'Input',
  category: 'Operator',
  inputs: ['input'],
  outputs: ['output'],
  params: [],
  tags: [],
  boot: ({ inputs, outputs }) => {
    inputs.input.subscribe({
      next: itemBatch => {
        console.log('Input received batch:', itemBatch);

        outputs.output.next(
          itemBatch.map(item => ({
            ...item,
            mapped: true
          }))
        )
      },
      complete: () => {
        console.log('input received complete signal on "input".');
        console.log('input about to complete "output".')
        outputs.output.complete()
      }
    });
  },
}