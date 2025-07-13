import { Computer } from '../types/Computer';
import { BatchLimit } from '../utils/batchLimit';

export const RemoveProperties: Computer = {
  type: 'RemoveProperties',
  label: 'RemoveProperties',
  inputs: [{
    name: 'input',
    schema: {},
  }],
  outputs: [{
    name: 'output',
    schema: {},
  }],
  params: [
    {
      name: 'properties_to_remove',
      label: 'Properties to Remove',
      type: 'StringableParam',
      multiline: true,
      canInterpolate: false,
      input: {
        rawValue: 'p1\np2\np3',
        Evaluation: 'STRING_LIST',
      },
      evaluations: [
        {
          type: 'JSON',
          label: 'json',
          shortLabel: 'json',
        },
        {
          type: 'STRING_LIST',
          label: 'list',
          shortLabel: 'list',
        },
      ],
      help: 'Comma-or-line-separated list of properties to remove from each item',
    },
  ],

  async *run({ input, output }) {
    while(true) {
      const incoming = input.pull(BatchLimit)
      output.push(incoming.map(item => {
        const propertiesToRemove = item.params.properties_to_remove as string[];
        console.log({ propertiesToRemove })

        for(const prop of propertiesToRemove) {
          if (prop in item.value) {
            delete item.value[prop];
          }
        }

        return item.value;
      }))

      yield;
    }
  },
};
