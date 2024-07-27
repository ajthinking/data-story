import { num } from '../Param';
import { Computer } from '../types/Computer';

export const Sample: Computer = {
  name: 'Sample',
  label: 'Sample',
  inputs: [{
    name: 'input',
    schema: {},
  }],
  outputs: [
    {
      name: 'sampled',
      schema: {},
    },
    {
      name: 'not_sampled',
      schema: {},
    },
  ],
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
