import { ComputerConfig } from '../../types/ComputerConfig';
import { sleep } from '../../utils/sleep';
import { NumberCast } from '../../ParamV3';
import { OutputDevice } from '../../OutputDevice';
import { RunArgs } from '../../types/Computer';

export const Signal: ComputerConfig = {
  name: 'Signal',
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
        selected: true,
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
        selected: true,
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
