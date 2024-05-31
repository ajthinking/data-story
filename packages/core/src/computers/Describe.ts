import { ComputerConfig } from '../types/ComputerConfig';
import { multiline } from '../utils/multiline';
import { stringCast } from '../Param/casts/stringCast';
import { numberCast } from '../Param/casts/numberCast';
import { get } from '../utils/get';
import { num, str } from '../Param';

export const Describe: ComputerConfig = {
  name: 'Describe',
  docs: multiline`
    Describes the data structure of inputed items. Full outputs a nested object with occurrences of each item/key. Use the "truncated" port to get a similar summary more suitable for humans.
  `,
  inputs: ['input'],
  outputs: ['truncated', 'full'],
  params: [
    str(  {
      name: 'path',
      label: 'Path',
      help: 'Dot notated path to desired description root. Leave empty to use the root of the collection.',
      multiline: false,
      canInterpolate: true,
      interpolate: true,
      value: ''
    }),
    num(
      {
        name: 'truncate_limit',
        label: 'Truncate limit',
        help: 'How many keys to display?',
        multiline: false,
        canInterpolate: true,
        interpolate: true,
        value: String(10)
      }),
  ],

  canRun({ input }) {
    return input.haveAllItemsAtInput('input')
  },

  async *run({ input, output, params }) {
    const incoming = input.pull()
      .map(i => {
        return get(i.value, String(params.path));
      })

    const description = describeCollection(incoming)
    const truncated = truncateDescription(description, Number(params.truncate_limit))

    output.pushTo('full', [description])
    output.pushTo('truncated', [truncated])

    yield;
  },
};

export function describeCollection(arr: any[]) {
  const result = {};

  // Function to recursively process each object
  const processObject = (obj: any, res: any) => {
    Object.keys(obj).forEach(key => {
      if (obj[key] !== null && typeof obj[key] === 'object') {
        res[key] = res[key] || {};
        processObject(obj[key], res[key]);
      } else {
        res[key] = res[key] || {};
        res[key][obj[key]] = (res[key][obj[key]] || 0) + 1;
      }
    });
  };

  // Iterate over each object in the array
  arr.forEach(obj => {
    processObject(obj, result);
  });

  return result;
}

export function truncateDescription(description: any, threshold = 10) {
  const truncate = (obj: any) => {
    Object.keys(obj).forEach(key => {
      if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
        const entries = Object.entries(obj[key]);
        if (entries.length > threshold) {
          // Sort entries by their count, descending
          entries.sort((a: any, b: any) => b[1] - a[1]);

          // Keep the top (threshold - 1) entries and sum the rest
          const topEntries = entries.slice(0, threshold);
          const otherCount = entries.slice(threshold).reduce((acc, [, count]) => acc + (count as any), 0);

          // Create a new object with the top entries and 'OTHER_VALUES'
          obj[key] = topEntries.reduce((acc: any, [value, count]) => {
            acc[value] = count;
            return acc;
          }, {});
          obj[key]['OTHER_VALUES'] = otherCount;
        } else {
          truncate(obj[key]);
        }
      }
    });
  };

  // Clone the object to avoid modifying the original
  const truncatedDescription = JSON.parse(JSON.stringify(description));
  truncate(truncatedDescription);
  return truncatedDescription;
}
