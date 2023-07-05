import { ComputerConfigFactory, RunArgs } from '../../types/Computer';
import { number } from '../../ParamBuilder';
import { sleep } from '../../utils/sleep';
import { ComputerConfig } from '../../types/ComputerConfig';

export const Sleep: ComputerConfigFactory = (): ComputerConfig => ({
  name: 'Sleep',
  inputs: ['input'],
  outputs: ['output'],
  params: {
    duration: number('duration').value(100).get()
  },

  async *run({ input, output }) {
    while(true) {
      const [ { value, params: { duration } } ] = input.pull(1)
      await sleep(duration)
      output.push([value])

      yield;
    }
  },
});