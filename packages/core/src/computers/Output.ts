import { createDefaultStringable, str } from '../Param';
import { Computer } from '../types/Computer';

export const Output: Computer = {
  name: 'Output',
  label: 'Output',
  inputs: [{
    name: 'input',
    schema: {},
  }],
  outputs: [{
    name: 'output',
    schema: {},
  }],
  params: [
    createDefaultStringable({
      name: 'port_name',
      label: 'Port Name',
      value: 'output',
      help: 'The name of the output port.',
      multiline: false,
      canInterpolate: true,
    }),
  ],

  async *run({ input, output }) {
    while(true) {
      const [ portName, ...other ] = output.getPortNames()
      if (!portName || other.length > 0) throw new Error('Output computer must have exactly one output port.')

      const incoming = input.pull()

      output.pushTo(portName, incoming)

      yield;
    }
  },
};
