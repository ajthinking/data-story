
import { JsEvaluation, JsonEvaluation, json_ } from '../../Param';
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
      help: 'Replace the item with this JSON (default) or a JS function',
      evaluations: [
        { ...JsonEvaluation, selected: true },
        JsEvaluation,
      ]
    })
  ],
  
  async *run({ input, output }) {
    while(true) {
      const incoming = input!.pull()

      console.log(
        incoming[0].params,
        incoming[0].params.json,
      )

      const replacers = incoming.map(item => item.params.json as ItemValue)

      output.push(replacers)

      yield;
    }
  },
};
