import { Ignore, CreateJson, Pass } from './computers';
import { Diagram } from './Diagram';
import { DiagramBuilder } from './DiagramBuilder';


describe('get', () => {
  it('returns the diagram', () => {
    const diagram = new DiagramBuilder().get()

    expect(diagram).toBeInstanceOf(Diagram)
  })
})

describe('add', () => {
  it('adds a node to the diagram and ensures unique ids', () => {
    const diagram = new DiagramBuilder()
      .add(CreateJson)
      .add(Pass)
      .add(Pass)
      .add(Ignore)
      .get()
    
    const nodeIds = diagram.nodes.map(node => node.id)
    const nodeTypes = diagram.nodes.map(node => node.type)
    const nodeInputs = diagram.nodes.map(node => node.inputs)
    const nodeOutputs = diagram.nodes.map(node => node.outputs)

    expect(nodeIds).toMatchObject([
      'CreateJson.1',
      'Pass.1',
      'Pass.2',
      'Ignore.1'
    ])

    expect(nodeTypes).toMatchObject([
      'CreateJson',
      'Pass',
      'Pass',
      'Ignore'
    ])

    expect(nodeInputs).toMatchObject([
      [],
      [{id: 'Pass.1.input', name: 'input'}],
      [{id: 'Pass.2.input', name: 'input'}],
      [{id: 'Ignore.1.input', name: 'input'}]
    ])

    expect(nodeOutputs).toMatchObject([
      [{id: 'CreateJson.1.output', name: 'output'}],
      [{id: 'Pass.1.output', name: 'output'}],
      [{id: 'Pass.2.output', name: 'output'}],
      []
    ])
  })

  it('links nodes together if possible', () => {
    const diagram = new DiagramBuilder()
      .add(CreateJson)
      .add(Pass)
      .get()

    expect(diagram.links).toMatchObject([
      {
        id: 'CreateJson.1.output--->Pass.1.input',
        sourcePortId: 'CreateJson.1.output',
        targetPortId: 'Pass.1.input'
      }
    ])
  })

  it('does not link nodes together if not possible', () => {
    const diagram = new DiagramBuilder()
      .add(CreateJson)
      .add(CreateJson)
      .get()

    expect(diagram.links).toMatchObject([])
  })
})