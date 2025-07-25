import { jsFn } from '../Param';
import { multiline } from '../utils/multiline';
import { Computer } from '../types/Computer';
import { BatchLimit } from '../utils/batchLimit';

export const If: Computer = {
  type: 'Computer',
  computerType: 'If',
  label: 'If',
  inputs: [{
    name: 'input',
    schema: {},
  }],
  outputs: [
    {
      name: 'true',
      schema: {},
    },
    {
      name: 'false',
      schema: {},
    },
  ],
  params: [
    jsFn({
      name: 'condition',
      value: multiline`
        item => item.value > 0
      `,
      help: 'JavaScript function that returns true or false',
    }),
  ],

  async *run({ input, output, params }) {
    while(true) {
      const items = input.pull(BatchLimit)

      for (const item of items) {
        output.pushTo(
          item.params.condition ? 'true' : 'false',
          [item],
        )
      }

      yield;
    }
  },
};
