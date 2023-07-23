import { Diagram } from './Diagram';
import { Link } from './types/Link';
import { Node } from './types/Node';
import { PortWithSchema } from './types/PortWithSchema';

describe('linksConnectedToPortId', () => {
  it('returns links connected to port', () => {
    const port: PortWithSchema = {
      id: 'port-id',
      name: 'My Port',
      schema: {}
    }
    const link: Link = {
      id: 'link-id',
      sourcePortId: 'source-port-id',
      targetPortId: 'port-id'
    }

    const diagram = new Diagram([], [link])
    const result = diagram.linksConnectedToPortId(port.id)
    expect(result).toMatchObject([link])
  })
})

describe('nodeWithOutputPortId', () => {
  it('returns the node given a output port id', () => {
    const output: PortWithSchema = {
      id: 'output-port-id',
      name: 'output',
      schema: {}
    }

    const node: Node = {
      id: 'node-id',
      type: 'MyNode',  
      inputs: [],
      outputs: [output],
      params: {}
    }

    const diagram = new Diagram([node], [])
    const result = diagram.nodeWithOutputPortId('output-port-id')
    
    expect(result).toMatchObject(node)
  })

  it('returns undefined if it could not find a matching node', () => {
    const diagram = new Diagram([], [])
    const result = diagram.nodeWithOutputPortId('bad-id')
    
    expect(result).toBe(undefined)
  })  
})