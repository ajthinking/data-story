import { Element } from '../Element';

export const droner: Element = {
  name: 'droner',
  label: 'Droner',
  category: 'Source',
  inputs: [],
  outputs: [],
  params: [],
  tags: [],
  boot: ({}) => {
    console.log('Droner boot.');
  },
};
