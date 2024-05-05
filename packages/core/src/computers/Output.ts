import { str } from '../Param';
import { ComputerConfig } from '../types/ComputerConfig';

export const Output: ComputerConfig = {
  name: 'Output',
  inputs: ['input'],
  outputs: ['output'],
  params: [
    str({
      name: 'port_name',
      label: 'Port Name',
      value: 'output',
    })
  ],

  async *run({ input, output}) {
    while(true) {
      const [ portName, ...other ] = output.getPortNames()
      if (!portName || other.length > 0) throw new Error('Output computer must have exactly one output port.')

      const incoming = input.pull()

      output.pushTo(portName, incoming)

      yield;
    }
  },
};
