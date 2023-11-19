
import { ComputerConfig } from '../../types/ComputerConfig';

export const Log: ComputerConfig = {
  name: 'Log',
  inputs: ['input'],

  async *run({ input, output }) {
    while(true) {
      // log the *item* - not ItemWithParams
      const incoming = input.pull().map(i => i.value)
      console.log(JSON.stringify(incoming, null, 2))

      yield;
    }
  },
};