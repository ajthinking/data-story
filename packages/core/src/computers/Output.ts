import { str } from '../Param';
import { Computer } from '../types/Computer';
import { BatchLimit } from '../utils/batchLimit';

export const Output: Computer = {
  type: 'Computer',
  computerType: 'Output',
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
    str({
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

      const incoming = input.pull(BatchLimit)

      output.pushTo(portName, incoming)

      yield;
    }
  },
};
