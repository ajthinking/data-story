
import { ComputerConfig } from '../types/ComputerConfig';
import { str } from '../Param';

export const RemoveProperties: ComputerConfig = {
  name: 'RemoveProperties',
  label: 'RemoveProperties',
  inputs: ['input'],
  outputs: ['unfiltered'],
  params: [
    {
      name: 'remove_properties',
      label: 'Remove Properties',
      help: 'remove output json the selected properties',
      type: 'RepeatableParam',
      row: [
        str({
          name: 'property',
          label: 'Property',
          value: 'id',
        }),
        {
          name: 'port',
          label: 'Port',
          help: 'The port to map to',
          type: 'PortSelectionParam',
          value: '',
          allowCreate: true,
        }
      ],
      value: [],
    },
  ],

  async *run({ input, output, params }) {
    console.log('RemoveProperties - run');
    console.log(params, 'RemoveProperties - params', input, 'RemoveProperties - input', output, 'RemoveProperties - output');
  },
};
