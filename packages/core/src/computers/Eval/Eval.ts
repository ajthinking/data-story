import { json } from '../../ParamBuilder';
import { Computer, ComputerConfigFactory } from '../../types/Computer';
import { ComputerConfig } from '../../types/ComputerConfig';

export const Eval: ComputerConfigFactory = (): ComputerConfig => ({
  name: 'Eval',
  inputs: [{
    name: 'input',
    schema: {}
  }],
  outputs: [{
    name: 'output',
    schema: {}
  }],
  params: {
    js: json('js').value(`// Provide JS. You may use variables: item, item.value, item.params`).get(),
  },

  async *run({ input, output }) {
    if(
      process.env.USE_UNSAFE_EVAL === undefined
      || process.env.USE_UNSAFE_EVAL === 'false'
    ) throw new Error(
      'Unsafe eval is disabled. If you really want to do this, set USE_UNSAFE_EVAL=true in your .env file.'
    )

    while(true) {
      const [ item ] = input.pull(1)

      eval(item.params.js)

      output.push([ item ])

      yield;
    }
  },
});
