import { createDefaultStringable, str } from '../Param';
import { ComputerConfig } from '../types/ComputerConfig';

export const SendToPortal: ComputerConfig = {
  name: 'SendToPortal',
  inputs: ['input'],
  outputs: [],
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

  async *run({ input, output, params, unfoldedDiagram }) {
    while(true) {
      const incoming = input.pull()
      const portId = params.port_id as string

      // Find the link ids at the receiving port
      const linkIds = unfoldedDiagram
        .diagram
        .linksAtOutputPortId(portId)
        .map(link => link.id)

      console.log('In SendToPortal, linkIds: ', linkIds)

      // Magically, we push the incoming data to these links
      output.pushToLinks(linkIds, incoming)

      yield;
    }
  },
};
