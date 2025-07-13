import { ComputerFactory } from './ComputerFactory'
import { NodeDescriptionFactory } from './NodeDescriptionFactory'
import { Computer } from './types/Computer'

describe('fromComputer', () => {
  it('returns a NodeDescription', () => {
    const config = {
      type: 'test',
      inputs: [{
        name: 'input1',
        schema: {},
      }],
    } as Computer

    const computer = new ComputerFactory().getInstance(config)

    const nodeDescription = NodeDescriptionFactory.fromComputer(computer)

    expect(nodeDescription).toMatchObject({
      type: 'test',
      label: 'test',
      inputs: [{
        name: 'input1',
        schema: {},
      }],
      outputs: [],
      params: [],

    })
  })
})