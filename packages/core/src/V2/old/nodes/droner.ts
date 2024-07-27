import { Element } from '../Element';

export const droner: Element = {
  name: 'droner',
  label: 'Droner',
  category: 'Source',
  inputs: [],
  outputs: [],
  params: [],

  boot: ({}) => {
    console.log('Droner boot.');
  },
};
