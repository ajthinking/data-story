import { ComputerConfigFactory, RunArgs } from '../../types/Computer';
import { ComputerConfig } from '../../types/ComputerConfig';

export const Input: ComputerConfigFactory = (): ComputerConfig => ({
  name: 'Input',
  outputs: ['output'],
  
  canRun({ input, isAvailable }) {
    return isAvailable()
      && input.havePort('input') // Is this good?
      && input.haveItemsAtInput('input')
  },

  async *run({ input, output }) {
    console.log(input)

    while(true) {
      const incoming = input.pull()
      output.push(incoming)

      yield;
    }
  },
});
