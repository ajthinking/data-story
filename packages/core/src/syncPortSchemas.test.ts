import { Diagram } from './Diagram'
import { syncPortSchemas } from './syncPortSchemas'
import { Node } from './types/Node'

it('forwards schema to linked ports', () => {
  const outputPort = {
    id: 'node1.output',
    name: 'output',
    schema: {
      someProperty: 'someValue',
    },
  }

  const node1: Node = {
    id: 'node1',
    name: 'MyNode',
    inputs: [],
    outputs: [outputPort],
    params: [],
  }

  const inputPort = {
    id: 'node2.input',
    name: 'input',
    schema: {},
  }

  const node2: Node = {
    id: 'node2',
    name: 'MyNode',
    inputs: [inputPort],
    outputs: [],
    params: [],
  }

  const link = {
    id: 'link1',
    sourcePortId: 'node1.output',
    targetPortId: 'node2.input',
  }

  const diagram = new Diagram({
    nodes: [node1, node2],
    links: [link],
  })

  syncPortSchemas(link, diagram)

  expect(inputPort.schema).toMatchObject({
    someProperty: 'someValue',
  })
})