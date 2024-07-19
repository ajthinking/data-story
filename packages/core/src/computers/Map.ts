import { json_ } from '../Param';
import { jsFunctionEvaluation } from '../Param/evaluations/jsFunctionEvaluation';
import { jsonEvaluation } from '../Param/evaluations/jsonEvaluation';
import { hjsonEvaluation } from '../Param/evaluations/hjsonEvaluation';
import { ItemValue } from '../types/ItemValue';
import { merge } from '../utils/merge';
import { multiline } from '../utils/multiline';
import { Computer } from '../types/Computer';

export const Map: Computer = {
  name: 'Map',
  label: 'Map',
  tags: [],
  docs: multiline`
  Replaces the item with a new value. Supported input are: HJSON, JSON and JS function
  `,
  inputs: [{
    name: 'input',
    schema: {}
  }],
  outputs: [{
    name: 'output',
    schema: {}
  }],
  params: [
    {
      name: 'mode',
      label: 'Mode',
      help: '',
      type: 'SelectParam',
      value: 'MERGE',
      options: [
        { value: 'MERGE', label: 'MERGE' },
        { value: 'REPLACE', label: 'REPLACE' },
      ],
    },
    json_({
      name: 'json',
      value: '{\n\t"foo": "bar"\n}',
      help: '',
    })
  ],

  async *run({ input, output, params }) {
    while(true) {
      const incoming = input.pull()

      const replacers = incoming.map(item => {
        if(params.mode === 'REPLACE') return item.params.json as ItemValue;

        if(params.mode === 'MERGE') return merge(item.value, item.params.json as Object);

        throw new Error(`Unknown mode: ${params.mode}`)
      })

      output.push(replacers)

      yield;
    }
  },
};
