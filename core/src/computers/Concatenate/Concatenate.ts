import { string } from '../../ParamBuilder';
import { Computer, ComputerConfigFactory } from '../../types/Computer';
import { ComputerConfig } from '../../types/ComputerConfig';

export const Concatenate: ComputerConfigFactory = (): ComputerConfig => ({
  name: 'Concatenate',
  inputs: ['input'],
  outputs: ['output'],
  params: {
    property: string('property').get(),
    delimiter: string('delimiter').value(',').get(),
    concatenated_property: string('concatenated_property')
      .value('concatenated')
      .get(),
  },

  canRun: ({ input }) => {
    return input.haveItemsAtInput('input')
      && input.haveAllItemsAtInput('input')
  },

  async *run({ input, output, params }) {
    
    const incoming = input.pull()

    output.push([{
      [params.concatenated_property]: incoming
        .map((item: any) => item.value[params.property])
        .join(params.delimiter),
    }])
  },
});
