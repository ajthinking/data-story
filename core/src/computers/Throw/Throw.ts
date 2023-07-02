import { ComputerConfigFactory, RunArgs } from '../../types/Computer';
import { string } from '../../ParamBuilder';
import { ComputerConfig } from '../../types/ComputerConfig';

export const Throw: ComputerConfigFactory = (): ComputerConfig => ({
  name: 'Throw',
  inputs: ['input'],
  params: {
    message: string('message').value('Some error').get()
  },

  async *run({ input }) {
    const [item] = input.pull(1)
    throw Error(item.params.message)
  },
});
