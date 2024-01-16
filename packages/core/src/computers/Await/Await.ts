
import { ComputerConfig } from '../../types/ComputerConfig';
import { NumberCast } from '../../Param';

export const Await: ComputerConfig = {
  name: 'Await',
  inputs: ['input'],
  outputs: ['output'],
  params: [
    {
      name: 'number_of_items',
      label: 'Number of Items',
      help: 'How many items to await?', 
      inputMode: {
        type: 'Stringable',
        multiline: false,
        canInterpolate: true,
        interpolate: true,
        casts: [
          {...NumberCast, selected: true}
        ],
        value: 'Infinity'
      },
      alternativeInputModes: []
    },    
  ],


  canRun({ input, params }) {
    const haveChunk = input.haveItemsAtInput(
      'input',
      params.number_of_items.inputMode.value as number
    )

    const haveRemainder = input.haveAllItemsAtInput('input')

    return haveChunk || haveRemainder
  },

  async *run({ input, output, params }) {
    while(true) {
      const incoming = input.pull()

      const pulledCount = incoming.length
      const chunkSize = params.number_of_items as number
      
      output.push(incoming)

      if(pulledCount < chunkSize) break;

      yield;
    }
  },
};
