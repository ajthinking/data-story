import { str } from '../Param';
import { Computer } from '../types/Computer';

export const LoopStart: Computer = {
  type: 'LoopStart',
  label: 'Loop Start',
  inputs: [{
    name: 'input',
    schema: {},
  }],
  outputs: [{
    name: 'output',
    schema: {},
  }],
  params: [
    str({
      name: 'port_name',
      label: 'Port Name',
      value: 'has-more',
      help: 'The name of the loop start port.',
      multiline: false,
      canInterpolate: true,
    }),
  ],
  async *run({ input, output }) {
    while(true) {
      const [ portName, ...other ] = input.getPortNames()

      if (!portName || other.length > 0) throw new Error('LoopStart computer must have exactly one input port.')

      const incoming = input.pullFrom(portName)

      output.push(incoming)

      yield;
    }
  },
};
