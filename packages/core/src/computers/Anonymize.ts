import { ItemValue } from '../types/ItemValue';
import { Computer } from '../types/Computer';
import { anonymize } from '../utils/anonymize';
import { BatchLimit } from '../utils/batchLimit';

export const Anonymize: Computer = {
  type: 'Anonymize',
  label: 'Anonymize',
  inputs: [{
    name: 'input',
    schema: {},
  }],
  outputs: [{
    name: 'output',
    schema: {},
  }],
  params: [],

  async *run({ input, output, params }) {
    while(true) {
      const incoming = input.pull(BatchLimit)

      const replacers = incoming.map(item => anonymize(item.value)) as ItemValue[]

      output.push(replacers)

      yield;
    }
  },
};
