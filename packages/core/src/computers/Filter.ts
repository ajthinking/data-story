import { str } from '../Param';
import { ComputerConfig } from '../types/ComputerConfig';

export const Filter: ComputerConfig = {
  name: 'Filter',
  label: 'Filter',
  inputs: ['input'],
  outputs: ['unfiltered'],
  params: [
    // property
    str({
      name: 'property',
      value: 'id',
    }),
    {
      name: 'port_map',
      label: 'Port Map',
      help: 'Where to map items',
      type: 'RepeatableParam',
      row: [
        str({
          name: 'value',
          value: 'id',
        }),
        {
          name: 'port',
          label: 'Port',
          help: 'The port to map to',
          type: 'PortSelectionParam',
          value: '',
          allowCreate: true,
        }
      ],
      value: [],
    },
  ],

  async *run({ input, output, params }) {
    while(true) {
      const [ item ] = input.pull(1)

      const portName = (() => {
        const portMap = params.port_map as any
        const property = params.property as string
        const value = item.value[property]

        const mapping = portMap.find((mapping: any) => mapping.value == value)

        return mapping?.port ?? 'unfiltered'
      })()

      output.pushTo(portName, [item])

      yield;
    }
  },
};
