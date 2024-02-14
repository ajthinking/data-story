
import { ComputerConfig } from '../types/ComputerConfig';

export const Output: ComputerConfig = {
  name: 'Output',

  async *run({ input, output}) {
    while(true) {
      console.log('Running Output computer')

      const [ portName, ...other ] = output.getPortNames()
      if (!portName || other.length > 0) throw new Error('Output computer must have exactly one output port.')

      const incoming = input.pullFrom(portName)
      output.pushTo(portName, incoming)

      console.log('Yielding...')
      yield;
    }
  },
};
