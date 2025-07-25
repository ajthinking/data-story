import { ItemValue } from '../types/ItemValue';
import { ItemWithParams } from '../ItemWithParams';
import { str } from '../Param';
import { Computer } from '../types/Computer';
import { get } from '../utils/get';

export const Aggregate: Computer = {
  type: 'Computer',
  computerType: 'Aggregate',
  label: 'Aggregate',
  inputs: [
    {
      name: 'input',
      schema: {},
    },
  ],
  outputs: [
    {
      name: 'aggregated',
      schema: {},
    },
  ],
  params: [
    str(
      {
        name: 'aggregation_property',
        label: 'Aggregation Property',
        help: 'The property to aggregate on',
        multiline: false,
        canInterpolate: false,
        interpolate: false,
        value: '',
      },
    ),
  ],

  canRun({ input, isAvailable }) {
    return isAvailable() && input.haveAllItemsAtInput('input')
  },

  async *run({ input, output, params }) {
    const all = input.pull()
    const property: string = get(params, 'aggregation_property')

    const groups = new Map();
    for (const item of all) {
      const key = property ? get(item.value, property) : null;

      if (!groups.has(key)) groups.set(key, []);

      groups.get(key).push(item);
    }

    for (const [key, group] of groups) {
      const aggretion: ItemValue = {
        type: 'aggregate',
        key,
        length: group.length,
        items: group.map((item: ItemWithParams) => item.value),
      }

      output.pushTo('aggregated', [aggretion]);
    }
  },
};
