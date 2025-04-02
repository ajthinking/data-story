import { sleep } from '../utils/sleep';
import { hjson, json_, num } from '../Param';
import { jsFunctionEvaluation } from '../Param/evaluations/jsFunctionEvaluation';
import { jsExpressionEvaluation } from '../Param/evaluations/jsExpressionEvaluation';
import { jsonEvaluation } from '../Param/evaluations/jsonEvaluation';
import { Computer } from '../types/Computer';

export const Signal: Computer = {
  name: 'Signal',
  label: 'Signal',
  inputs: [],
  outputs: [{
    name: 'output',
    schema: {
      id: 'any',
    },
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
      help: 'Use this field to customize the signal. ${{i}} is available as a variable.',
      // Avoid Hjson bug
      value: [
        '{',
        '  id: ${{i}}',
        '}',
      ].join('\n'),
      evaluations: [
        { ...jsonEvaluation, selected: true },
        jsFunctionEvaluation,
        jsExpressionEvaluation,
      ],
    }),
  ],

  async *run({ input, output, params }) {
    const period = Number(params.period)
    const count = Number(params.count)

    // If period is 0, send all signals at once
    if(period === 0) {
      const shapedBatch: Object[] = []

      for(let i = 1; i <= count; i++) {
        const [ spawned ] = input.pullNew({ i })
        const shaped = spawned.params.expression as Object
        shapedBatch.push(shaped)
      }

      output.push(shapedBatch)
      yield;
      return;
    }

    // If period is > 0, send signals one by one
    let i = 1;
    while(i <= count) {
      if(period > 0) await sleep(period)

      const [ spawned ] = input.pullNew({ i })
      const shaped = spawned.params.expression as Object
      output.push([shaped])

      i++;
      yield;
    }
  },
};
