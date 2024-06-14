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
    outputs.output.next([{ created: true }])
    outputs.output.complete()
  },
}