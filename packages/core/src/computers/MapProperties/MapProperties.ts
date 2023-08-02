
import { ItemWithParams } from '../../ItemWithParams';
import { json, string, text } from '../../ParamBuilder';
import { ComputerConfig } from '../../types/ComputerConfig';
import { ItemValue } from '../../types/ItemValue';
import { mapAdditive } from './mapAdditive';
import { mapReplace } from './mapReplace';

export const MapProperties: ComputerConfig = {
  name: 'MapProperties',
  inputs: ['input'],
  outputs: ['output'],
  params: {
    mode: string('mode').value('ADD').get(),
    map: json('map').value('{}').get(),
  },

  async *run({ input, output, params }) {
    const mode = params.mode as 'ADD' | 'REPLACE'
    const map = JSON.parse(params.map) as Record<string, any>

    while(true) {
      const incoming = input.pull() as ItemWithParams[]
      output.push(incoming.map(item => {
        if(mode === 'ADD') return mapAdditive(item.value, map)
        if(mode === 'REPLACE') return mapReplace(item.value, map)

        throw new Error(`Unknown mode: ${mode}`)
      }))

      yield;
    }
  },
};
