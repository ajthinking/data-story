
import { number } from '../../ParamBuilder';
import { sleep } from '../../utils/sleep';
import { ComputerConfig } from '../../types/ComputerConfig';
import { NumberCast } from '../../Param';

export const Sleep: ComputerConfig = {
  name: 'Sleep',
  inputs: ['input'],
  outputs: ['output'],
  params: [
    {
      name: 'duration',
      label: 'Duration',
      help: 'How many ms to sleep?', 
      inputMode: {
        type: 'Stringable',
        multiline: false,
        canInterpolate: true,
        interpolate: true,
        casts: [
          {...NumberCast, selected: true}
        ],
        value: String(100)
      },
      alternativeInputModes: []
    },    
  ],

  async *run({ input, output }) {
    while(true) {
      const [ { value, params: { duration } } ] = input.pull(1)
      await sleep(duration)
      output.push([value])

      yield;
    }
  },
};