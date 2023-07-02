import { ComputerConfigFactory, RunArgs } from '../../types/Computer';
import { ItemValue } from '../../types/ItemValue';
import { string } from '../../ParamBuilder';
import { ComputerConfig } from '../../types/ComputerConfig';

export const Filter: ComputerConfigFactory = (): ComputerConfig => ({
  name: 'Filter',
  inputs: ['input'],
  outputs: ['passed', 'failed'],
  params: {
    left: string('left').get(),
    // operator: string('operator').get(), // only support equals for now
    right: string('right').get(),
  },
  
  async *run({ input, output }) {
    while(true) {
      const incoming = input!.pull() as ItemValue[]

      
      incoming.forEach(item => {
        if(item.params.left === item.params.right) {
          return output.pushTo('passed', [item])
        }

        output.pushTo('failed', [item])
      })

      yield;
    }
  },
});