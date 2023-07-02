import { ComputerConfigFactory, RunArgs } from '../../types/Computer';
import { ComputerConfig } from '../../types/ComputerConfig';
import { number } from '../../ParamBuilder';
import { sleep } from '../../utils/sleep';

export const Signal: ComputerConfigFactory = (): ComputerConfig => ({
  name: 'Signal',
  inputs: [],

  outputs: [{
    name: 'output',
    schema: {
      id: 'any',
    }
  }],

  params: {
    period: number('period').value(50).get(),
    count: number('count').value(300).get(),
  },

  async *run({
    output,
    params: { period, count}
  }) {
    let i = 1;

    while(i <= count) {
      await sleep(period)
      output.push([{
        id: i++
      }])

      yield;
    }
  },
});
