import { createDefaultStringable, str } from '../Param';
import { ComputerConfig } from '../types/ComputerConfig';
import { sleep } from '../utils/sleep';

export const Portal: ComputerConfig = {
  name: 'Portal',
  inputs: [],
  outputs: ['output'],
  params: [
    createDefaultStringable({
      name: 'port_id',
      label: 'Port Id',
      value: 'output',
      help: 'The id of the receiving port.',
      multiline: false,
      canInterpolate: false
    })
  ],

  canRun({}) {
    return true;
  },

  async *run() {
    while(true) {
      await sleep(1000)
      yield;
    }
  },
};
