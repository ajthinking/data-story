import { jsFn, json_ } from '../Param';
import { jsFunctionEvaluation } from '../Param/evaluations/jsFunctionEvaluation';
import { jsonEvaluation } from '../Param/evaluations/jsonEvaluation';
import { hjsonEvaluation } from '../Param/evaluations/hjsonEvaluation';
import { ItemValue } from '../types/ItemValue';
import { merge } from '../utils/merge';
import { multiline } from '../utils/multiline';
import { Computer } from '../types/Computer';
import { anonymize } from '../utils/anonymize';

export const Anonymize: Computer = {
  name: 'Anonymize',
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
      const incoming = input.pull()

      const replacers = incoming.map(item => anonymize(item.value)) as ItemValue[]

      output.push(replacers)

      yield;
    }
  },
};
