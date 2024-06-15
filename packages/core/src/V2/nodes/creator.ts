import { Element } from '../Element'

export const creator: Element = {
  name: 'creator',
  label: 'Creator',
  category: 'Source',
  inputs: [],
  outputs: ['output'],
  params: [],
  tags: [],
  boot: async ({ outputs }) => {
    console.log('Creator started.');
    const data = [{ created: true }];
    console.log('Creator emitting data:', data);
    outputs.output.next(data);
    outputs.output.complete();
    console.log('Creator completed.');
  },
}
