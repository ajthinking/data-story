import { Diagram } from './Diagram';
import { DiagramBuilder } from './DiagramBuilder';
import { ConsoleLog, Create, Input, Output, Pass } from './computers';
import { Link } from './types/Link';
import { Node } from './types/Node';
import { Port } from './types/Port';

describe('add', () => {
  it('adds a node to the diagram', () => {
    const diagram = new Diagram()
    const node: Node = {
      id: 'node-id',
      type: 'MyNode',
      inputs: [],
      outputs: [],
      params: []
    }

    expect(diagram.nodes).toEqual([])
    diagram.add(node)
    expect(diagram.nodes).toEqual([node])
  })
})

describe('nodeWithOutputPortId', () => {
  it('returns the node given a output port id', () => {
    const output: Port = {
      id: 'output-port-id',
      name: 'output',
      schema: {}
    }

    const node: Node = {
      id: 'node-id',
      type: 'MyNode',
      inputs: [],
      outputs: [output],
      params: []
    }

    const diagram = new Diagram({ nodes: [node]})
    const result = diagram.nodeWithOutputPortId('output-port-id')

    expect(result).toMatchObject(node)
  })

  it('returns undefined if it could not find a matching node', () => {
    const diagram = new Diagram()
    const result = diagram.nodeWithOutputPortId('bad-id')

    expect(result).toBe(undefined)
  })
})

describe('unfold', () => {
  it('can undfold an empty diagram', () => {
    const subDiagram = new Diagram()

    const diagram = new Diagram({
      localNodeDefinitions: {
        MyNode: subDiagram }
    })

    const result = diagram.unfold()

    expect(result).toMatchObject(new Diagram({
      localNodeDefinitions: {
        MyNode: subDiagram }
    }))
  })

  it('can unfold a diagram with a single node', () => {
    const normalNode: Node = {
      id: 'derived-1',
      type: 'normalNode',
      inputs: [],
      outputs: [],
      params: []
    }

    const derivedNode = new Diagram({ nodes: [normalNode]})

    const node: Node = {
      id: 'usage-id',
      type: 'derivedNode',
      inputs: [],
      outputs: [],
      params: []
    }

    const diagram = new Diagram({
      nodes: [normalNode],
      localNodeDefinitions: { derivedNode }
    })

    const result = diagram.unfold()

    expect(result).toMatchObject(new Diagram({
      nodes: [normalNode],
      localNodeDefinitions: { derivedNode }
    }))
  })

  it('can unfold a linked diagram', () => {
    // main: Create -> X -> ConsoleLog
    // x: Input -> Pass -> Output
    // expected: Create -> Input -> Pass -> Output -> ConsoleLog

    const subDiagram = new DiagramBuilder()
      .add(Input, { port_name: 'x_input'})
      .add(Pass)
      .add(Output, { port_name: 'x_output' })
      .get()

    const diagram = new DiagramBuilder()
      .registerLocalNodeDefinitions({
        X: subDiagram
      })
      .add(Create)
      .addSubNode('X')
      .add(ConsoleLog)
      .get()

    const result = diagram.unfold()

    expect(result.nodes).toMatchObject([
      { type: 'Create' },
      // Note X is removed here
      { type: 'ConsoleLog' },
      // Note subDiagram nodes are appended
      { type: 'Input' },
      { type: 'Pass' },
      { type: 'Output' },
    ])
    const linksForSnapshot = result.links.map(link => ({
      ...link,
      // replace id with a fixed value
      id: 'REPLACED_ID',
    }));

    expect(linksForSnapshot).toMatchInlineSnapshot(`
      [
        {
          "id": "REPLACED_ID",
          "sourcePortId": "Create.1.output",
          "targetPortId": "Input.1.input",
        },
        {
          "id": "REPLACED_ID",
          "sourcePortId": "Output.1.output",
          "targetPortId": "ConsoleLog.1.input",
        },
        {
          "id": "REPLACED_ID",
          "sourcePortId": "Input.1.output",
          "targetPortId": "Pass.1.input",
        },
        {
          "id": "REPLACED_ID",
          "sourcePortId": "Pass.1.output",
          "targetPortId": "Output.1.input",
        },
      ]
    `);
  })
})

describe('connect', () => {
  it('adds a link', () => {
    const diagram = new Diagram()

    const link: Link = {
      id: 'fake-link-id',
      sourcePortId: 'fake-port-id-1',
      targetPortId: 'fake-port-id-2',
    }

    expect(diagram.links).toEqual([])
    diagram.connect(link)
    expect(diagram.links).toEqual([link])
  })

  it('calls provided onConnect handlers', () => {
    const callback1 = vi.fn()
    const callback2 = vi.fn()

    const diagram = new Diagram({
      onConnect: [
        callback1,
        callback2,
      ]
    })

    const link: Link = {
      id: 'fake-link-id',
      sourcePortId: 'fake-port-id-1',
      targetPortId: 'fake-port-id-2',
    }

    diagram.connect(link)

    expect(callback1).toHaveBeenCalledWith(link, diagram)
    expect(callback2).toHaveBeenCalledWith(link, diagram)
  })
})
