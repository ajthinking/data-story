import { ComputerConfig } from '../types/ComputerConfig';
import { str } from '../Param';
import { ItemWithParams } from '../ItemWithParams';

export const RemoveProperties: ComputerConfig = {
  name: 'RemoveProperties',
  label: 'RemoveProperties',
  inputs: ['input'],
  outputs: ['output'],
  params: [
    {
      name: 'remove_properties',
      label: 'Remove Properties',
      help: 'The list of keys will be deleted in the output json',
      type: 'RepeatableParam',
      row: [
        str({
          name: 'property',
          label: 'Property',
          value: 'id',
        })
      ],
      value: [],
    },
  ],

  async* run({ input, output, params }) {

    const item = input.pull()[0];
    const param = (params.remove_properties ?? [{}]) as {
      id: string,
      port: string,
      property: string,
    }[];

    const properties = param.map(p => p.property);
    const newItem = new ItemWithParams({ ...item.value }, []);
    properties.forEach(p => delete newItem.value[p]);
    output.pushTo('output', [newItem]);

  },
};
