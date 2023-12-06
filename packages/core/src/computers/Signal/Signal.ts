import { ComputerConfig } from '../../types/ComputerConfig';
import { sleep } from '../../utils/sleep';
import { NumberCast } from '../../Param';
import { OutputDevice } from '../../OutputDevice';
import { RunArgs } from '../../types/Computer';
import { multiline } from '../../utils/multiline';

export const Signal: ComputerConfig = {
  name: 'Signal',
  docs: multiline`
    ### Description
    Creates an item every X ms, Y times. Useful for testing.
    The output will look like \`{ id: 1 }, { id: 2 }\` etc.
  `,
  inputs: [],
  outputs: [{
    name: 'output',
    schema: {
      id: 'any',
    }
  }],

  params: [
    {
      name: 'period',
      label: 'period',
      help: 'How many ms between each signal?', 
      inputMode: {
        type: 'Stringable',
        multiline: false,
        canInterpolate: true,
        interpolate: true,
        casts: [
          {...NumberCast, selected: true}
        ],
        value: String(50)
      },
      alternativeInputModes: []
    },
    {
      name: 'count',
      label: 'count',
      help: 'How many times to send the signal?',
      inputMode: {
        type: 'Stringable',
        multiline: false,
        canInterpolate: true,
        interpolate: true,
        casts: [
          {...NumberCast, selected: true}
        ],
        value: String(300)
      },
      alternativeInputModes: []
    },  
  ],

  async *run({ output, params }) {
    const period = Number(params.period)
    const count = Number(params.count)

    let i = 1;

    while(i <= count) {
      await sleep(period)
      output.push([{
        id: i++
      }])

      yield;
    }
  },
};
