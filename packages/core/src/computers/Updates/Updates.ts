import { ComputerConfigFactory, RunArgs } from '../../types/Computer';
import { ItemWithParams } from '../../ItemWithParams';
import { string, text } from '../../ParamBuilder';
import { ItemValue } from '../../types/ItemValue';
import { ComputerConfig } from '../../types/ComputerConfig';

export const Updates: ComputerConfigFactory = (): ComputerConfig => ({
  name: 'Updates',
  label: 'Updates',
  inputs: ['input'],
  params: {
    json: string('json').get(),
  },

  async *run({ input, hooks, params: rawParams }) {
    while(true) {
      const incoming = input.pull() as ItemWithParams[]

      for(const item of incoming) {
        hooks.register({
          type: 'UPDATES',
          args: [item.params.json]
        })
      }

      yield;
    }
  },
});
