
import { str } from '../Param';
import { ComputerConfig } from '../types/ComputerConfig';

export const Input: ComputerConfig = {
  name: 'Input',
  inputs: ['input'],
  outputs: ['output'],
  params: [
    str({
      name: 'port_name',
      label: 'Port Name',
      value: 'input',
    })
  ],

  async *run({ input, output}) {
    while(true) {
      console.log('Running Input computer')
      const [ portName, ...other ] = input.getPortNames()

      if (!portName || other.length > 0) throw new Error('Input computer must have exactly one input port.')

      const incoming = input.pullFrom(portName)

      output.pushTo(portName, incoming)

      console.log('Yielding...')
      yield;
    }
  },
};
