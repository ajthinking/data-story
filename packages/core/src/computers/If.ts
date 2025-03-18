import { jsFn } from '../Param';
import { multiline } from '../utils/multiline';
import { Computer } from '../types/Computer';

export const If: Computer = {
  name: 'If',
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
      input: multiline`
        item => item.value > 0
      `,
      help: 'JavaScript function that returns true or false',
    }),
  ],

  async *run({ input, output, params }) {
    while(true) {
      const items = input.pull()

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
