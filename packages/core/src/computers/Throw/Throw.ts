
import { NodeRunError } from '../../NodeRunError';
import { string } from '../../ParamBuilder';
import { ComputerConfig } from '../../types/ComputerConfig';

export const Throw: ComputerConfig = {
  name: 'Throw',
  inputs: ['input'],
  params: {
    message: string('message').value('Some error').get()
  },

  async *run({ input, node }) {
    const [item] = input.pull(1)
    throw new NodeRunError({
      message: item.params.message,
      node,
    })
  },
};
