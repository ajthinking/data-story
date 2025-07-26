import { str } from '../Param';
import { Computer } from '../types/Computer';
import { BatchLimit } from '../utils/batchLimit';

export const MakeSet: Computer = {
  type: 'Computer',
  computerType: 'MakeSet',
  label: 'MakeSet',
  inputs: [{
    name: 'input',
    schema: {},
  }],
  outputs: [{
    name: 'output',
    schema: {},
  }],
  params: [
    str({
      name: 'property',
      label: 'Property',
      value: '',
      help: 'The property to create unique items from',
      multiline: false,
      canInterpolate: false,
    }),
  ],
  async *run({ input, output, params }) {
    const seen = new Set();

    while (true) {
      const items = input.pull(BatchLimit);

      for (let item of items) {
        const property = params.property;
        const value = item.value[property];

        if (!seen.has(value)) {
          seen.add(value);
          output.push([{ [property]: value }]);
        }
      }

      yield;
    }
  },
};
