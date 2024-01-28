import { numberCast } from '../../Param/casts/numberCast';
import { stringCast } from '../../Param/casts/stringCast';
import { jsEvaluation } from '../../Param/evaluations/jsEvaluation';
import { jsonEvaluation } from '../../Param/evaluations/jsonEvaluation';
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
      type: 'RepeatableParam',
      row: [
        {
          name: 'key',
          label: 'Key',
          help: 'The key to create',
          type: 'StringableParam',
          multiline: false,
          canInterpolate: true,
          interpolate: true,
          interpolationsFromPort: ['input'],
          value: '',
        },
        {
          name: 'value',
          label: 'Value',
          help: 'The value to create',
          type: 'StringableParam',
          multiline: true,
          canInterpolate: true,
          interpolate: true,
          evaluations: [
            jsonEvaluation,
            jsEvaluation,
          ],
          casts: [
            numberCast,
            stringCast,
          ],
          value: '',
        },
      ],
      value: [],
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
