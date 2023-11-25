
import { str } from '../../Param';
import { ComputerConfig } from '../../types/ComputerConfig';

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
      inputMode: {
        type: 'Repeatable',
        row: [
          str({
            name: 'value',
            value: 'id',
          }),
          str({
            name: 'port',
            value: 'output',
          }),
        ],
        value: [],
      },
      alternativeInputModes: [],
    },
  ],

  async *run({ input, output, params }) {
    while(true) {
      console.log(params.port_map)

      const [ item ] = input.pull(1)

      const portName = (() => {
        const portMap = params.port_map as any
        const property = params.property as string
        const value = item.value[property]

        const mapping = portMap.find((mapping: any) => mapping.value === value)

        return mapping?.port ?? 'unfiltered'
      })()

      output.pushTo(portName, [item])

      yield;
    }
  },
};
