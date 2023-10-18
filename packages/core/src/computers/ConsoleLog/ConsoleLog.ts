
import { ItemWithParams } from '../../ItemWithParams';
import { string, text } from '../../ParamBuilder';
import { ItemValue } from '../../types/ItemValue';
import { ComputerConfig } from '../../types/ComputerConfig';

export const ConsoleLog: ComputerConfig = {
  name: 'ConsoleLog',
  label: 'Console.log',
  inputs: ['input'],
  params: {
    message: string('message').value(undefined).get(),
  },

  async *run({ input, hooks, params: rawParams }) {
    while(true) {
      const incoming = input.pull() as ItemWithParams[]

      for(const item of incoming) {
        hooks.register({
          type: 'CONSOLE_LOG',
          args: [
            // If nothing passed log the whole item 
            !rawParams.message
              ? item.value
              : item.params.message
          ]
        })
      }

      yield;
    }
  },
};
