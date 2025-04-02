import { numberCast } from '../Param/casts/numberCast';
import { stringCast } from '../Param/casts/stringCast';
import { jsFunctionEvaluation } from '../Param/evaluations/jsFunctionEvaluation';
import { jsExpressionEvaluation } from '../Param/evaluations/jsExpressionEvaluation';
import { jsonEvaluation } from '../Param/evaluations/jsonEvaluation';
import { createDefaultStringable } from '../Param';
import { Computer } from '../types/Computer';

export const CreateProperties: Computer = {
  name: 'CreateProperties',
  label: 'CreateProperties',
  inputs: [
    {
      name: 'input',
      schema: {},
    },
  ],
  outputs: [
    {
      name: 'output',
      schema: {},
    },
  ],
  params: [
    {
      name: 'properties',
      label: 'Properties',
      help: 'The properties to create',
      type: 'RepeatableParam',
      row: [
        createDefaultStringable({
          name: 'key',
          label: 'Key',
          help: 'The key to create',
          multiline: false,
          canInterpolate: true,
          interpolate: true,
          interpolationsFromPort: ['input'],
          value: '',
        }),
        createDefaultStringable({
          name: 'value',
          label: 'Value',
          help: 'The value to create',
          multiline: true,
          canInterpolate: true,
          interpolate: true,
          evaluations: [
            jsonEvaluation,
            jsFunctionEvaluation,
            jsExpressionEvaluation,
          ],
          casts: [
            numberCast,
            stringCast,
          ],
          value: '',
        }),
      ],
      input: [],
    },
  ],

  async *run({ input, output }) {
    while(true) {
      const [ item ] = input.pull(1)
      if(typeof item.value !== 'object') throw new Error(
        'Items sent to CreateProperties must be an objects!',
      )

      type Property = { id: any, key: string, value: any }
      const properties = item.params.properties as Property[]

      for(const { id, key } of properties) {
        const fresh = (item.params.properties as Property[])
          .find((p: any) => p.id === id)!

        item.value[key] = fresh.value
      }

      output.push([item.value])

      yield;
    }
  },
};
