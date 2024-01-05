
import { ItemWithParams } from '../../ItemWithParams/ItemWithParams';
import { HjsonEvaluation, JsEvaluation, JsonEvaluation, NumberCast, StringCast } from '../../Param';
import { ComputerConfig } from '../../types/ComputerConfig';

export const Peek: ComputerConfig = {
  name: 'Peek',
  inputs: ['input'],

  async *run({ input, hooks, params: rawParams, node }) {
    const [ first ] = input.pull(1) as ItemWithParams[]

    hooks.register({
      type: 'PEEK',
      args: [ node.id, first.value ]
    })    

    while(true) {
      input.pull()

      yield;
    }
  },
};
