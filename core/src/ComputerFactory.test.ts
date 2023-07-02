import { ComputerFactory } from './ComputerFactory'
import { ComputerConfig } from './types/ComputerConfig'

describe('fromComputerConfig', () => {
  it('creates a computer from a sparse config', () => {
    const config = {
      name: 'test computer',
    } as ComputerConfig

    const computer = ComputerFactory.fromComputerConfig(config)

    expect(computer).toMatchObject({
      name: 'test computer',
      label: 'test computer',
      category: undefined,
      inputs: [],
      outputs: [],
      params: {},
      tags: [],
      run: expect.any(Function),
      canRun: undefined,
    })
  })

  it('upgrades simple string inputs and outputs to PortWithSchema', () => {
    const config = {
      name: 'test computer',
      inputs: ['input1', 'input2'],
      outputs: ['output1', 'output2'],
    } as ComputerConfig

    const computer = ComputerFactory.fromComputerConfig(config)

    expect(computer).toMatchObject({
      name: 'test computer',
      inputs: [
        { name: 'input1', schema: {} },
        { name: 'input2', schema: {} },
      ],
      outputs: [
        { name: 'output1', schema: {} },
        { name: 'output2', schema: {} },
      ],
    })
  })
})