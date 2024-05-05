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
