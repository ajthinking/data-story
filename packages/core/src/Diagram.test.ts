import { Diagram } from './Diagram';
import { Link } from './types/Link';
import { Node } from './types/Node';
import { Port } from './types/Port';

describe('add', () => {
  it('adds a node to the diagram', () => {
    const diagram = new Diagram()
    const node: Node = {
      id: 'node-id',
      name: 'MyNode',
      inputs: [],
      outputs: [],
      params: [],
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
      schema: {},
    }

    const node: Node = {
      id: 'node-id',
      name: 'MyNode',
      inputs: [],
      outputs: [output],
      params: [],
    }

    const diagram = new Diagram({ nodes: [node] })
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
})

describe('clone', () => {
  it('creates a deep clone of the diagram', () => {
    const node: Node = {
      id: 'node-id',
      name: 'MyNode',
      inputs: [],
      outputs: [],
      params: [],
    };

    const link: Link = {
      id: 'link-id',
      sourcePortId: 'port-id-1',
      targetPortId: 'port-id-2',
    };

    const viewport = { x: 10, y: 20, zoom: 2 };
    const diagram = new Diagram({ nodes: [node], links: [link], viewport });

    const clone = diagram.clone();

    expect(clone).not.toBe(diagram); // Different instances
    expect(clone.nodes).toEqual(diagram.nodes);
    expect(clone.links).toEqual(diagram.links);
    expect(clone.viewport).toEqual(diagram.viewport);

    // Modify clone and check original remains unchanged
    clone.nodes[0].id = 'modified-node-id';
    expect(diagram.nodes[0].id).toBe('node-id');
  });
});