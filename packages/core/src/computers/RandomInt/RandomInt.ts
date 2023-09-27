
import { ComputerConfig } from '../../types/ComputerConfig';

export const RandomInt: ComputerConfig = {
  name: 'RandomInt',
  inputs: ['input'],
  outputs: ['output'],
  
  async *run({ input, output }) {
    while(true) {
      const incoming = input!.pull()
      output.push(incoming.map(i => ({
        ...i.value,
        number: Math.floor(Math.random() * 100),
      })))

      yield;
    }
  },
};
