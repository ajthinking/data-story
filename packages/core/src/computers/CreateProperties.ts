import { numberCast } from '../Param/casts/numberCast';
import { stringCast } from '../Param/casts/stringCast';
import { hjsonEvaluation } from '../Param/evaluations/hjsonEvaluation';
import { jsFunctionEvaluation } from '../Param/evaluations/jsFunctionEvaluation';
import { jsExpressionEvaluation } from '../Param/evaluations/jsExpressionEvaluation';
import { jsonEvaluation } from '../Param/evaluations/jsonEvaluation';
import { createDefaultStringable } from '../Param';
import { Computer } from '../types/Computer';

export const CreateProperties: Computer = {
  name: 'CreateProperties',
  label: 'CreateProperties',
  tags: [],
  inputs: [
    {
      name: 'input',
      schema: {}
    }
  ],
  outputs: [
    {
      name: 'output',
      schema: {}
    }
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
            hjsonEvaluation,
            jsFunctionEvaluation,
            jsExpressionEvaluation,
          ],
          casts: [
            numberCast,
            stringCast,
          ],
          value: '',
        })
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
