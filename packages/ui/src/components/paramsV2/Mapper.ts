import { ComputerConfig, ItemValue } from '@data-story/core'

// THE PARAM "map" WILL LOOK SOMETHING LIKE:
const map = {
  type: 'repeatable',
  value: [
    {
      type: 'row',
      value: [
        {
          type: 'string',
          value: 'name'
        },
        {
          type: 'string',
          value: 'name'
        }
      ]
    }
  ]
}

const interpret = (smth: any) => {};

const mapItem = (item: ItemValue, map: any) => {
  // Start with a fresh item
  const result: ItemValue = {}

  // For each row in the map assign properties
  for(const row in item.params.map.values) {
    const [key, value] = row

    result[key] = interpret(value);
  }

  return result
}

export const Mapper: ComputerConfig = {
  name: 'MapProperties',
  inputs: ['input'],
  outputs: ['output'],
  params: {},

  async *run({ input, output, params: { map } }) {
    while(true) {
      output.push(
        input.pull().map(i => mapItem(i, map))
      )

      yield;
    }
  },
};