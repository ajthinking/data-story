
import { ComputerConfig } from '../../types/ComputerConfig';

export const Map: ComputerConfig = {
  name: 'Map',
  label: 'Map',
  inputs: ['input'],
  outputs: ['output'],
  params: [
    {
      name: 'properties',
      label: 'Properties',
      help: 'The properties to create',
      inputMode: {
        type: 'Repeatable',
        row: [
          {
            name: 'key',
            label: 'Key',
            help: 'The key to create',
            inputMode: {
              type: 'Stringable',
              multiline: false,
              canInterpolate: true,
              interpolate: true,
              value: '',
            },
            alternativeInputModes: [],
          },
          {
            name: 'value',
            label: 'Value',
            help: 'The value to create',
            inputMode: {
              type: 'Stringable',
              multiline: false,
              canInterpolate: true,
              interpolate: true,
              value: '',
            },
            alternativeInputModes: [],
          },          
        ],
        value: [],
      },
      alternativeInputModes: [],
    },
  ],

  async *run({ input, output }) {
    while(true) {
      const [ item ] = input.pull(1)

      const map = item.params.properties as any

      const result = {
        ...item.value,
      }

      for(const { key, value } of map) {
        result[key] = value
      }

      output.push([result])

      yield;
    }
  },
};
