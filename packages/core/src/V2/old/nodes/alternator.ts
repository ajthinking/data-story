import { Element } from '../Element';
export const alternator: Element = {
  name: 'alternator',
  label: 'Alternator',
  category: 'Operator',
  inputs: ['input'],
  outputs: ['output1', 'output2'],
  params: [],

  boot: ({ inputs, outputs }) => {
    let toggle = true;
    const swapToggle = () => {
      toggle = !toggle;
    }

    inputs.input.subscribe({
      next: itemBatch => {
        console.log('Alternator received batch:', itemBatch);
        itemBatch.forEach(item => {
          const output = toggle ? outputs.output1 : outputs.output2;
          swapToggle()
          output.next([item])
        });
      },
      complete: () => {
        console.log('alternator received complete signal on "input".');
        // propagate complete signal to all outputs
        console.log('alternator about to complete "output1".')
        outputs.output1.complete();
        console.log('alternator about to complete "output2".')
        outputs.output2.complete();
      }
    });
  },
};