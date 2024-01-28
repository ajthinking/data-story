
import { ComputerConfig } from '../../types/ComputerConfig';

export const Output: ComputerConfig = {
  name: 'Output',
  inputs: ['input'],

  async *run({ input, output }) {
    while(true) {
      const incoming = input.pull()
      console.log('PUSHING FROM THE OUTPUT NODE!')
      output.push(incoming)

      yield;
    }
  },
};
