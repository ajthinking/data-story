
import { json_ } from '../../Param';
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

      const replacers = incoming
        .map(item => item.params.json as string)
        .map(json => JSON.parse(json))

      output.push(replacers)

      yield;
    }
  },
};
