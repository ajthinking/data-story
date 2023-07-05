import { ComputerConfigFactory, RunArgs } from '../../types/Computer';
import { ItemWithParams } from '../../ItemWithParams';
import { string, text } from '../../ParamBuilder';
import { ItemValue } from '../../types/ItemValue';
import { ComputerConfig } from '../../types/ComputerConfig';

export const CreateAttribute: ComputerConfigFactory = (): ComputerConfig => ({
  name: 'CreateAttribute',
  inputs: ['input'],
  outputs: ['output'],
  params: {
    key: string('key').get(),
    value: string('value').get(),
  },

  async *run({ input, output, params }) {
    while(true) {
      const incoming = input.pull() as ItemWithParams[]
      output.push(incoming.map(item => {
        item.value[item.params.key] = item.params.value
        return item
      }))

      yield;
    }
  },
});
