import { createDefaultStringable } from '../../../Param';
import { numberCast } from '../../../Param/casts/numberCast';
import { Element } from '../Element';

export const creator: Element = {
  name: 'creator',
  label: 'Creator',
  category: 'Source',
  inputs: [],
  outputs: ['output'],
  params: [
    createDefaultStringable({
      name: 'count',
      label: 'Count',
      help: 'How many items to create?',
      multiline: false,
      canInterpolate: true,
      interpolate: true,
      casts: [
        { ...numberCast, selected: true }
      ],
      value: String(1)
    }),
  ],
  tags: [],
  boot: ({ outputs, params }) => {
    const count = parseInt(params.count.value as unknown as string);
    const data = Array.from({ length: count }, (_, index) => ({ id: index + 1 }));
    console.log('Creator emitting data:', data);

    outputs.output.next(data);
    console.log('creator about to complete "output".')
    outputs.output.complete();
  },
};
