
import { ComputerConfig } from '../../types/ComputerConfig';
import { multiline } from '../../utils/multiline';
import { describeCollection, truncateDescription } from './describeCollection';
import { stringCast } from '../../Param/casts/stringCast';
import { numberCast } from '../../Param/casts/numberCast';
import { get } from '../../utils/get';

export const Describe: ComputerConfig = {
  name: 'Describe',
  docs: multiline`
    Describes the data structure of inputed items. Full outputs a nested object with occurrences of each item/key. Use the "truncated" port to get a similar summary more suitable for humans.
  `,
  inputs: ['input'],
  outputs: ['truncated', 'full'],
  params: [
    {
      name: 'path',
      label: 'Path',
      help: 'Dot notated path to desired description root. Leave empty to use the root of the collection.',
      type: 'Stringable',
      multiline: false,
      canInterpolate: true,
      interpolate: true,
      casts: [
        {...stringCast, selected: true}
      ],
      value: ''
    },
    {
      name: 'truncate_limit',
      label: 'Truncate limit',
      help: 'How many keys to display?', 
      type: 'Stringable',
      multiline: false,
      canInterpolate: true,
      interpolate: true,
      casts: [
        {...numberCast, selected: true}
      ],
      value: String(10)
    },    
  ],
  
  canRun({ input }) {
    return input.haveAllItemsAtInput('input')
  },

  async *run({ input, output, params }) {
    const incoming = input.pull()
      .map(i => get(i.value, String(params.path)))

    const description = describeCollection(incoming)
    const truncated = truncateDescription(description, Number(params.truncate_limit))

    output.pushTo('full', [description])
    output.pushTo('truncated', [truncated])

    yield;
  },
};
