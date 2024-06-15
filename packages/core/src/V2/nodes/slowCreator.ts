import { sleep } from '../../utils/sleep';
import { Element } from '../Element'

export const slowCreator: Element = {
  name: 'slowCreator',
  label: 'Slow Creator',
  category: 'Source',
  inputs: [],
  outputs: ['output'],
  params: [],
  tags: [],
  boot: async ({ outputs }) => {
    console.log('Slow Creator started, waiting...');
    await sleep(1000);  // Introduce a delay of 1000ms
    console.log('Slow Creator emitting data...');
    outputs.output.next([{ created: true }]);
    outputs.output.complete();
    console.log('Slow Creator completed.');
  },
}