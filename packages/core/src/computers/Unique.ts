import axios from 'axios';
import { json_, str } from '../Param';
import Hjson from '@data-story/hjson';
import { ItemWithParams } from '../ItemWithParams';
import { Computer } from '../types/Computer';

export const Unique: Computer = {
  name: 'Unique',
  label: 'Unique',
  inputs: [{
    name: 'input',
    schema: {},
  }],
  outputs: [
    {
      name: 'unique',
      schema: {},
    },
    {
      name: 'duplicates',
      schema: {},
    },
  ],
  params: [
    str({
      name: 'property',
      value: '',
    }),
  ],

  canRun({ input }) {
    return input.haveAllItemsAtInput('input')
  },

  async *run({ input, output, params }) {
    const unique: ItemWithParams[] = []
    const duplicates: ItemWithParams[] = []

    // The property that should be tested for uniqueness
    const property = params.property as string

    // The incoming objects to test
    const incoming = input.pull()

    const itemCounts = new Map();

    // Count occurrences of each item
    for (const item of incoming) {
      const propValue = item.value[property];
      if (!itemCounts.has(propValue)) {
        itemCounts.set(propValue, 1);
      } else {
        itemCounts.set(propValue, itemCounts.get(propValue) + 1);
      }
    }

    // Classify items as unique or duplicate based on their counts
    for (const item of incoming) {
      const propValue = item.value[property];
      if (itemCounts.get(propValue) === 1) {
        unique.push(item);
      } else {
        duplicates.push(item);
      }
    }

    output.pushTo('unique', unique)
    output.pushTo('duplicates', duplicates)
  },
};
