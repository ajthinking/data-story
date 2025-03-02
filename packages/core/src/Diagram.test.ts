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

describe('getLoops', () => {
  it('returns empty array when no loops exist', () => {
    const node1: Node = {
      id: 'Node.1',
      name: 'Node',
      inputs: [],
      outputs: [{ id: 'Node.1.output', name: 'output', schema: {} }],
      params: [],
    };

    const node2: Node = {
      id: 'Node.2',
      name: 'Node',
      inputs: [{ id: 'Node.2.input', name: 'input', schema: {} }],
      outputs: [],
      params: [],
    };

    const link: Link = {
      id: 'Node.1.output-->Node.2.input',
      sourcePortId: 'Node.1.output',
      targetPortId: 'Node.2.input',
    };

    const diagram = new Diagram({
      nodes: [node1, node2],
      links: [link],
    });

    expect(diagram.getLoops()).toEqual([]);
  });

  it('finds simple two-node loop', () => {
    const node1: Node = {
      id: 'Loop.1',
      name: 'Loop',
      inputs: [{ id: 'Loop.1.input', name: 'input', schema: {} }],
      outputs: [{ id: 'Loop.1.output', name: 'output', schema: {} }],
      params: [],
    };

    const node2: Node = {
      id: 'Loop.2',
      name: 'Loop',
      inputs: [{ id: 'Loop.2.input', name: 'input', schema: {} }],
      outputs: [{ id: 'Loop.2.output', name: 'output', schema: {} }],
      params: [],
    };

    const links: Link[] = [
      {
        id: 'Loop.1.output-->Loop.2.input',
        sourcePortId: 'Loop.1.output',
        targetPortId: 'Loop.2.input',
      },
      {
        id: 'Loop.2.output-->Loop.1.input',
        sourcePortId: 'Loop.2.output',
        targetPortId: 'Loop.1.input',
      },
    ];

    const diagram = new Diagram({
      nodes: [node1, node2],
      links,
    });

    const loops = diagram.getLoops();
    expect(loops).toHaveLength(1);
    expect(loops[0]).toHaveLength(2);
    expect(loops[0]).toContain(node1);
    expect(loops[0]).toContain(node2);
  });

  it('finds three-node loop', () => {
    const node1: Node = {
      id: 'Loop.1',
      name: 'Loop',
      inputs: [{ id: 'Loop.1.input', name: 'input', schema: {} }],
      outputs: [{ id: 'Loop.1.output', name: 'output', schema: {} }],
      params: [],
    };

    const node2: Node = {
      id: 'Loop.2',
      name: 'Loop',
      inputs: [{ id: 'Loop.2.input', name: 'input', schema: {} }],
      outputs: [{ id: 'Loop.2.output', name: 'output', schema: {} }],
      params: [],
    };

    const node3: Node = {
      id: 'Loop.3',
      name: 'Loop',
      inputs: [{ id: 'Loop.3.input', name: 'input', schema: {} }],
      outputs: [{ id: 'Loop.3.output', name: 'output', schema: {} }],
      params: [],
    };

    const links: Link[] = [
      {
        id: 'Loop.1.output-->Loop.2.input',
        sourcePortId: 'Loop.1.output',
        targetPortId: 'Loop.2.input',
      },
      {
        id: 'Loop.2.output-->Loop.3.input',
        sourcePortId: 'Loop.2.output',
        targetPortId: 'Loop.3.input',
      },
      {
        id: 'Loop.3.output-->Loop.1.input',
        sourcePortId: 'Loop.3.output',
        targetPortId: 'Loop.1.input',
      },
    ];

    const diagram = new Diagram({
      nodes: [node1, node2, node3],
      links,
    });

    const loops = diagram.getLoops();
    expect(loops).toHaveLength(1);
    expect(loops[0]).toHaveLength(3);
    expect(loops[0]).toContain(node1);
    expect(loops[0]).toContain(node2);
    expect(loops[0]).toContain(node3);
  });

  it('finds multiple independent loops', () => {
    // First loop: Loop.1 <--> Loop.2
    const loop1Node1: Node = {
      id: 'Loop.1',
      name: 'Loop',
      inputs: [{ id: 'Loop.1.input', name: 'input', schema: {} }],
      outputs: [{ id: 'Loop.1.output', name: 'output', schema: {} }],
      params: [],
    };

    const loop1Node2: Node = {
      id: 'Loop.2',
      name: 'Loop',
      inputs: [{ id: 'Loop.2.input', name: 'input', schema: {} }],
      outputs: [{ id: 'Loop.2.output', name: 'output', schema: {} }],
      params: [],
    };

    // Second loop: Loop.3 <--> Loop.4
    const loop2Node1: Node = {
      id: 'Loop.3',
      name: 'Loop',
      inputs: [{ id: 'Loop.3.input', name: 'input', schema: {} }],
      outputs: [{ id: 'Loop.3.output', name: 'output', schema: {} }],
      params: [],
    };

    const loop2Node2: Node = {
      id: 'Loop.4',
      name: 'Loop',
      inputs: [{ id: 'Loop.4.input', name: 'input', schema: {} }],
      outputs: [{ id: 'Loop.4.output', name: 'output', schema: {} }],
      params: [],
    };

    const links: Link[] = [
      // First loop
      {
        id: 'Loop.1.output-->Loop.2.input',
        sourcePortId: 'Loop.1.output',
        targetPortId: 'Loop.2.input',
      },
      {
        id: 'Loop.2.output-->Loop.1.input',
        sourcePortId: 'Loop.2.output',
        targetPortId: 'Loop.1.input',
      },
      // Second loop
      {
        id: 'Loop.3.output-->Loop.4.input',
        sourcePortId: 'Loop.3.output',
        targetPortId: 'Loop.4.input',
      },
      {
        id: 'Loop.4.output-->Loop.3.input',
        sourcePortId: 'Loop.4.output',
        targetPortId: 'Loop.3.input',
      },
    ];

    const diagram = new Diagram({
      nodes: [loop1Node1, loop1Node2, loop2Node1, loop2Node2],
      links,
    });

    const loops = diagram.getLoops();
    expect(loops).toHaveLength(2); // Two separate loops

    // Sort loops by first node ID to ensure consistent order
    const sortedLoops = [...loops].sort((a, b) => a[0].id.localeCompare(b[0].id));

    // First loop should be Loop.1 <--> Loop.2
    expect(sortedLoops[0]).toHaveLength(2);
    expect(sortedLoops[0]).toContain(loop1Node1);
    expect(sortedLoops[0]).toContain(loop1Node2);

    // Second loop should be Loop.3 <--> Loop.4
    expect(sortedLoops[1]).toHaveLength(2);
    expect(sortedLoops[1]).toContain(loop2Node1);
    expect(sortedLoops[1]).toContain(loop2Node2);
  });
});

describe('getAncestors', () => {
  it('returns empty array for node with no ancestors', () => {
    const node: Node = {
      id: 'Node.1',
      name: 'Node',
      inputs: [],
      outputs: [],
      params: [],
    };

    const diagram = new Diagram({ nodes: [node] });
    expect(diagram.getAncestors(node)).toEqual([]);
  });

  it('returns direct ancestors', () => {
    const ancestor: Node = {
      id: 'Ancestor.1',
      name: 'Ancestor',
      inputs: [],
      outputs: [{ id: 'Ancestor.1.output', name: 'output', schema: {} }],
      params: [],
    };

    const child: Node = {
      id: 'Child.1',
      name: 'Child',
      inputs: [{ id: 'Child.1.input', name: 'input', schema: {} }],
      outputs: [],
      params: [],
    };

    const link: Link = {
      id: 'Ancestor.1.output-->Child.1.input',
      sourcePortId: 'Ancestor.1.output',
      targetPortId: 'Child.1.input',
    };

    const diagram = new Diagram({
      nodes: [ancestor, child],
      links: [link],
    });

    expect(diagram.getAncestors(child)).toEqual([ancestor]);
  });

  it('returns all ancestors in a chain', () => {
    const grandparent: Node = {
      id: 'Grandparent.1',
      name: 'Grandparent',
      inputs: [],
      outputs: [{ id: 'Grandparent.1.output', name: 'output', schema: {} }],
      params: [],
    };

    const parent: Node = {
      id: 'Parent.1',
      name: 'Parent',
      inputs: [{ id: 'Parent.1.input', name: 'input', schema: {} }],
      outputs: [{ id: 'Parent.1.output', name: 'output', schema: {} }],
      params: [],
    };

    const child: Node = {
      id: 'Child.1',
      name: 'Child',
      inputs: [{ id: 'Child.1.input', name: 'input', schema: {} }],
      outputs: [],
      params: [],
    };

    const links: Link[] = [
      {
        id: 'Grandparent.1.output-->Parent.1.input',
        sourcePortId: 'Grandparent.1.output',
        targetPortId: 'Parent.1.input',
      },
      {
        id: 'Parent.1.output-->Child.1.input',
        sourcePortId: 'Parent.1.output',
        targetPortId: 'Child.1.input',
      },
    ];

    const diagram = new Diagram({
      nodes: [grandparent, parent, child],
      links,
    });

    const ancestors = diagram.getAncestors(child);
    expect(ancestors).toHaveLength(2);
    expect(ancestors).toContain(parent);
    expect(ancestors).toContain(grandparent);
  });

  it('handles cycles without infinite recursion', () => {
    const node1: Node = {
      id: 'CycleNode.1',
      name: 'CycleNode',
      inputs: [{ id: 'CycleNode.1.input', name: 'input', schema: {} }],
      outputs: [{ id: 'CycleNode.1.output', name: 'output', schema: {} }],
      params: [],
    };

    const node2: Node = {
      id: 'CycleNode.2',
      name: 'CycleNode',
      inputs: [{ id: 'CycleNode.2.input', name: 'input', schema: {} }],
      outputs: [{ id: 'CycleNode.2.output', name: 'output', schema: {} }],
      params: [],
    };

    const links: Link[] = [
      {
        id: 'CycleNode.1.output-->CycleNode.2.input',
        sourcePortId: 'CycleNode.1.output',
        targetPortId: 'CycleNode.2.input',
      },
      {
        id: 'CycleNode.2.output-->CycleNode.1.input',
        sourcePortId: 'CycleNode.2.output',
        targetPortId: 'CycleNode.1.input',
      },
    ];

    const diagram = new Diagram({
      nodes: [node1, node2],
      links,
    });

    const ancestors = diagram.getAncestors(node1);
    expect(ancestors).toHaveLength(1);
    expect(ancestors).toContain(node2);
  });
});

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