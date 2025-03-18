import { str } from '../Param';
import { ItemWithParams } from '../ItemWithParams';
import { Computer } from '../types/Computer';

export const RemoveProperties: Computer = {
  name: 'RemoveProperties',
  label: 'RemoveProperties',
  inputs: [{
    name: 'input',
    schema: {},
  }],
  outputs: [{
    name: 'output',
    schema: {},
  }],
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
          input: 'id',
        }),
      ],
      input: [],
    },
  ],

  async* run({ input, output, params }) {
    const items = input.pull();
    const param = (params.remove_properties ?? []) as unknown as {
      property: string,
    }[];

    const properties = param.map(p => p.property);
    const result = items.map((item) => {
      const [ newItem ] = input.pullNew({ ...item.value });
      properties.forEach(p => delete newItem.value[p]);
      return newItem;
    });

    output.pushTo('output', result);
  },
};
