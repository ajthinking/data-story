import { ComputerConfig } from '../types/ComputerConfig';
import { numberCast } from '../Param/casts/numberCast';

export const Await: ComputerConfig = {
  name: 'Await',
  inputs: ['input'],
  outputs: ['output', 'no_items'],
  params: [
    {
      name: 'number_of_items',
      label: 'Number of Items',
      help: 'How many items to await?',
      type: 'StringableParam',
      multiline: false,
      canInterpolate: true,
      interpolate: true,
      casts: [
        {...numberCast, selected: true}
      ],
      value: 'Infinity'
    },
  ],

  canRun({ input, params }) {
    const haveChunk = input.haveItemsAtInput(
      'input',
      params.number_of_items.value as number
    )

    const haveRemainder = input.haveAllItemsAtInput('input')

    return haveChunk || haveRemainder
  },

  async *run({ input, output, params }) {
    let hasPulledAny = false

    while(true) {
      const incoming = input.pull()

      const pulledCount = incoming.length
      if(pulledCount > 0) hasPulledAny = true
      const chunkSize = params.number_of_items as number

      output.push(incoming)

      if(pulledCount === 0) output.pushTo('no_items', [{
        message: 'No items available to await node.'
      }])

      if(pulledCount < chunkSize) break;

      yield;
    }
  },
};
