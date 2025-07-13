import { str } from '../Param';
import { Computer } from '../types/Computer';
import { BatchLimit } from '../utils/batchLimit';

export const LoopBack: Computer = {
  type: 'LoopBack',
  label: 'Loop Back',
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
      help: 'The name of the loop back port.',
      multiline: false,
      canInterpolate: true,
    }),
  ],
  async *run({ input, output }) {
    while(true) {
      const [ portName, ...other ] = output.getPortNames()
      if (!portName || other.length > 0) throw new Error('LoopBack computer must have exactly one output port.')

      const incoming = input.pull(BatchLimit)

      output.pushTo(portName, incoming)

      yield;
    }
  },
};
