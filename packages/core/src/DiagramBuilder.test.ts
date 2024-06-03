import { Ignore, Create, Pass, Signal } from './computers';
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
      .add(Create)
      .add(Pass)
      .add(Pass)
      .add(Ignore)
      .get()

    const nodeIds = diagram.nodes.map(node => node.id)
    const nodeTypes = diagram.nodes.map(node => node.type)
    const nodeInputs = diagram.nodes.map(node => node.inputs)
    const nodeOutputs = diagram.nodes.map(node => node.outputs)

    expect(nodeIds).toMatchObject([
      'Create.1',
      'Pass.1',
      'Pass.2',
      'Ignore.1'
    ])

    expect(nodeTypes).toMatchObject([
      'Create',
      'Pass',
      'Pass',
      'Ignore'
    ])

    expect(nodeInputs).toMatchObject([
      [],
      [{id: 'Pass.1.input', name: 'input', schema: {}}],
      [{id: 'Pass.2.input', name: 'input', schema: {}}],
      [{id: 'Ignore.1.input', name: 'input', schema: {}}]
    ])

    expect(nodeOutputs).toMatchObject([
      [{id: 'Create.1.output', name: 'output'}],
      [{id: 'Pass.1.output', name: 'output'}],
      [{id: 'Pass.2.output', name: 'output'}],
      []
    ])
  })

  it('can set params', () => {
    const diagram = new DiagramBuilder()
      .add(Signal, { period: 99 })
      .get()

    const periodParam = diagram
      .nodes[0]
      .params
      .find(param => param.name === 'period')

    expect(periodParam).toMatchObject({
      name: 'period',
      value: {
        value: 99
      }
    })
  })

  it.todo('can set params without affecting other nodes', () => {
    const diagram = new DiagramBuilder()
      .add(Signal, { label: 'Sigge' })
      .add(Pass)
      .get()

    expect(diagram.nodes).toMatchObject([
      {
        params: {
          label: {
            value: 'Sigge'
          }
        },
      },
      {
        params: {
          label: {
            value: 'Pass' // is Sigge!!!
          }
        }
      },
    ])
  })

  it('links nodes together if possible', () => {
    const diagram = new DiagramBuilder()
      .add(Create)
      .add(Pass)
      .get()

    expect(diagram.links).toMatchObject([
      {
        sourcePortId: 'Create.1.output',
        targetPortId: 'Pass.1.input'
      }
    ])
  })

  it('does not link nodes together if not possible', () => {
    const diagram = new DiagramBuilder()
      .add(Create)
      .add(Create)
      .get()

    expect(diagram.links).toMatchObject([])
  })
})

describe('on', () => {
  it('can link to a previous node port', () => {
    const diagram = new DiagramBuilder()
      .add(Create)
      .add(Pass)
      .from('Create.1.output').add(Ignore)
      .get();

    expect(diagram.links).toMatchObject([
      {
        sourcePortId: 'Create.1.output',
        targetPortId: 'Pass.1.input'
      },
      {
        sourcePortId: 'Create.1.output',
        targetPortId: 'Ignore.1.input'
      }
    ])
  })
})

// describe('on', () => {
// it('can link to specified port on most recent node', () => {
//   const diagram = new DiagramBuilder()
//     .add(Merge)
//     .from('not_merged').add(Pass)
//     .get();

//   expect(diagram.links).toMatchObject([
//     { id: 'Merge.1.not_merged--->Pass.1.input' },
//   ])
// }),

// it('throws if no such port exists', () => {
//   expect(() => {
//     new DiagramBuilder()
//       .add(Merge)
//       .from('bad_port').add(Pass)
//       .get();
//   }).toThrowError('Bad on directive: bad_port. Port not found on Merge.1')
// })
// })
