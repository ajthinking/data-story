import { ComputerFactory } from './ComputerFactory'
import { Computer } from './types/Computer'

describe('get', () => {
  it('creates a computer from a sparse config', () => {
    const config = {
      name: 'test computer',
    } as Computer

    const computer = new ComputerFactory().getInstance(config)

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

  it('upgrades simple string inputs and outputs to Port', () => {
    const config = {
      name: 'test computer',
      inputs: [
        {
          name: 'input1',
          schema: {},
        },
        {
          name: 'input2',
          schema: {},
        },
      ],
      outputs: [
        {
          name: 'output1',
          schema: {},
        },
        {
          name: 'output2',
          schema: {},
        },
      ],
    } as Computer

    const computer = new ComputerFactory().getInstance(config)

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