import { jsFn } from '../Param';
import { ItemValue } from '../types/ItemValue';
import { multiline } from '../utils/multiline';
import { Computer } from '../types/Computer';
import { BatchLimit } from '../utils/batchLimit';

export const Router: Computer = {
  type: 'Computer',
  computerType: 'Router',
  label: 'Router',
  inputs: [{
    name: 'input',
    schema: {},
  }],
  outputs: [{
    name: 'output',
    schema: {},
  }],
  params: [
    jsFn({
      name: 'routing',
      value: multiline`
        function(item) {
          return 'output'
        }
      `,
      help: '',
    }),
  ],

  async *run({ input, output, params }) {
    while(true) {
      const incoming = input.pull(BatchLimit)
      for(const item of incoming) {
        const port = item.params.routing
        output.pushTo(port, [item])
      }

      yield;
    }
  },
};
