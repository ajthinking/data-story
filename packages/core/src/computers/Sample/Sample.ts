import { ComputerConfig } from '../../types/ComputerConfig';
import { num } from '../../Param';

export const Sample: ComputerConfig = {
  name: 'Sample',
  inputs: ['input'],
  outputs: ['sampled', 'not_sampled'],

  params: [
    num({
      name: 'sample_rate',
      help: 'Samples every nth item',
      value: '2' }
    )
  ],

  async *run({ input, output }) {
    let i = 0;

    while(true) {
      const [ item ] = input.pull(1)
      const sample_rate = Number(item.params.sample_rate)

      const port = i++ % sample_rate === 0
        ? 'sampled'
        : 'not_sampled'
      
      output.pushTo(port, [item])

      yield;
    }
  },
};
