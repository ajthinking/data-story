
import { ComputerConfig } from '../../types/ComputerConfig';

export const Pass: ComputerConfig = {
  name: 'Pass',
  inputs: ['input'],
  outputs: ['output'],
  
  async *run({ input, output }) {
    while(true) {
      const incoming = input!.pull()
      output.push(incoming)

      yield;
    }
  },
};
