
import { json_ } from '../../ParamV3';
import { ComputerConfig } from '../../types/ComputerConfig';

export const JsonReplace: ComputerConfig = {
  name: 'JsonReplace',
  inputs: ['input'],
  outputs: ['output'],
  params: [
    json_({ name: 'json', value: '{}' })
  ],
  
  async *run({ input, output }) {
    while(true) {
      const incoming = input!.pull()

      const replacers = incoming.map(item => item.params.json)

      output.push(replacers)

      yield;
    }
  },
};
