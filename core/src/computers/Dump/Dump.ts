import { ComputerConfigFactory, RunArgs } from '../../types/Computer';
import { ItemWithParams } from '../../ItemWithParams';
import { string, text } from '../../ParamBuilder';
import { ItemValue } from '../../types/ItemValue';
import { ComputerConfig } from '../../types/ComputerConfig';

export const Dump: ComputerConfigFactory = (): ComputerConfig => ({
  name: 'Dump',
  inputs: ['input'],
  params: {
    dump_name: string('dump_name').value('').get(),
  },

  canRun({ input }) {
    return input.haveItemsAtInput('input')
      && input.haveAllItemsAtInput('input')
  },

  async *run({ input, hooks, storage, params: { dump_name } }) {
    const incoming = input.pull() as ItemWithParams[]

    const name = dump_name || Math.random().toString(36).substring(7)

    await storage!.putExecutionItems(name, incoming.map(item => item.value))
    
    hooks.register({
      type: 'CONSOLE_LOG',
      args: ['Dump:', `http://localhost:3000/api/executions/${storage!.currentExecutionId}/dumps/${name}.json`]
    })      

  },
});
