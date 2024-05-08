import { ComputerConfig } from './types/ComputerConfig'
import { ComputerFactory } from './ComputerFactory'
import { NodeDescriptionFactory } from './NodeDescriptionFactory'

describe('fromComputer', () => {
  it('returns a NodeDescription', () => {
    const config = {
      name: 'test',
      inputs: [{
        name: 'input1',
        schema: {},
      }],
    } as ComputerConfig

    const computer = new ComputerFactory().fromComputerConfig(config)

    const nodeDescription = NodeDescriptionFactory.fromComputer(computer)

    expect(nodeDescription).toMatchObject({
      name: 'test',
      label: 'test',
      inputs: [{
        name: 'input1',
        schema: {},
      }],
      outputs: [],
      params: [],
      tags: [],
    })
  })
})