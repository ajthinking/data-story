
import { JsEvaluation, JsonEvaluation, HjsonEvaluation, json_ } from '../../Param';
import { ComputerConfig } from '../../types/ComputerConfig';
import { ItemValue } from '../../types/ItemValue';
import { multiline } from '../../utils/multiline';

export const ReplaceItem: ComputerConfig = {
  name: 'ReplaceItem',
  docs: multiline`
  Replaces the item with a new value. Supported input are: HJSON, JSON and JS function
  `,
  inputs: ['input'],
  outputs: ['output'],
  params: [
    {
      name: 'mode',
      label: 'Mode',
      help: '',
      inputMode: {
        type: 'Select',
        value: 'MERGE',
        options: [
          { value: 'MERGE', label: 'MERGE' },
          { value: 'REPLACE', label: 'REPLACE' },
        ],
      },
      alternativeInputModes: [],
    },
    json_({
      name: 'json',
      value: '{\n\tfoo: bar\n}',
      help: '',
      evaluations: [
        { ...HjsonEvaluation, selected: true },
        JsonEvaluation,
        JsEvaluation,
      ]
    })
  ],
  
  async *run({ input, output, params }) {
    while(true) {
      const incoming = input.pull()

      const replacers = incoming.map(item => {
        if(params.mode === 'REPLACE') return item.params.json as ItemValue;

        if(params.mode === 'MERGE')return {
          ...item.value,
          ...item.params.json as Object,
        }

        throw new Error(`Unknown mode: ${params.mode}`)
      })

      output.push(replacers)

      yield;
    }
  },
};
