
import { JsEvaluation, JsonEvaluation, HjsonEvaluation, json_ } from '../../Param';
import { ComputerConfig } from '../../types/ComputerConfig';
import { ItemValue } from '../../types/ItemValue';

export const ReplaceItem: ComputerConfig = {
  name: 'ReplaceItem',
  inputs: ['input'],
  outputs: ['output'],
  params: [
    json_({
      name: 'json',
      value: '{}',
      help: 'Replace the item with this HJSON (default), strict JSON or a JS function',
      evaluations: [
        { ...HjsonEvaluation, selected: true },
        // { ...JsonEvaluation, selected: true },
        JsonEvaluation,
        JsEvaluation,
      ]
    })
  ],
  
  async *run({ input, output }) {
    while(true) {
      const incoming = input!.pull()

      const replacers = incoming.map(item => item.params.json as ItemValue)

      output.push(replacers)

      yield;
    }
  },
};
