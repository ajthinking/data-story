
import { json_ } from '../../Param';
import { ComputerConfig } from '../../types/ComputerConfig';
import { ItemValue } from '../../types/ItemValue';

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

      const replacers = incoming.map(item => item.params.json as ItemValue)

      output.push(replacers)

      yield;
    }
  },
};
