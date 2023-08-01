import { ComputerConfigFactory } from '../../types/Computer';
import { ComputerConfig } from '../../types/ComputerConfig';
import { number } from '../../ParamBuilder';

export const Sample: ComputerConfigFactory = (): ComputerConfig => ({
  name: 'Sample',
  inputs: ['input'],
  outputs: ['sampled', 'not_sampled'],

  params: {
    sample_rate: number('sample_rate').value(2).get(),
  },

  async *run({
    input,
    output,
    params: { sample_rate }
  }) {
    let i = 0;

    while(true) {
      const [ item ] = input.pull(1)

      const port = i++ % sample_rate === 0
        ? 'sampled'
        : 'not_sampled'
      
      output.pushTo(port, [item])

      yield;
    }
  },
});
