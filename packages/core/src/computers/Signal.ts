import { sleep } from '../utils/sleep';
import { multiline } from '../utils/multiline';
import { hjson, json_, num } from '../Param';
import Hjson from '@data-story/hjson';
import { jsFunctionEvaluation } from '../Param/evaluations/jsFunctionEvaluation';
import { jsExpressionEvaluation } from '../Param/evaluations/jsExpressionEvaluation';
import { jsonEvaluation } from '../Param/evaluations/jsonEvaluation';
import { hjsonEvaluation } from '../Param/evaluations/hjsonEvaluation';
import { Computer } from '../types/Computer';

export const Signal: Computer = {
  name: 'Signal',
  label: 'Signal',
  inputs: [],
  outputs: [{
    name: 'output',
    schema: {
      id: 'any',
    }
  }],

  params: [
    num({
      name: 'period',
      help: 'How many ms between each signal?',
      value: 50,
    }),
    num({
      name: 'count',
      help: 'How many times to send the signal?',
      value: 300,
    }),
    hjson({
      name: 'expression',
      label: 'Template expression',
      help: 'Use this field to customize the signal. ${i} is available as a variable.',
      value: Hjson.stringify({id: '${i}'}),
      evaluations: [
        { ...hjsonEvaluation, selected: true },
        jsonEvaluation,
        jsFunctionEvaluation,
        jsExpressionEvaluation,
      ]
    })
  ],

  async *run({ input, output, params }) {
    const period = Number(params.period)
    const count = Number(params.count)

    let i = 1;

    while(i <= count) {
      await sleep(period)

      const [ spawned ] = input.pullNew({ i })
      const shaped = spawned.params.expression as Object
      output.push([shaped])

      i++;
      yield;
    }
  },
};
