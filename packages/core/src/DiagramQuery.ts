import { Diagram } from './Diagram';

export type NodeLabel = string
export type NodeId = string
export type NodeType = string

// <Type>.<PortName>
export type PortDescriptor = string

export class DiagramQuery {
  constructor(private diagram: Diagram) {}

  arePortsConnected(sourcePort: PortDescriptor, targetPort: PortDescriptor): boolean {
    const fromPortId = this.getPortId(sourcePort)
    const toPortId = this.getPortId(targetPort)

    return this.diagram.links.some(link => {
      return link.sourcePortId === fromPortId && link.targetPortId === toPortId
    })
  }

  protected getPortId(portDescriptor: PortDescriptor): string {
    const [nodeType, portName] = portDescriptor.split('.')

    const node = this.diagram.nodes.find(node => node.type === nodeType)
    if(!node) throw new Error(`Node with type ${nodeType} not found in diagram`);

    const port = [
      ...node.inputs,
      ...node.outputs,
    ].find(output => output.name === portName)
    if(!port) throw new Error(`Port with name ${portName} not found on node ${nodeType}`);

    return port.id
  }
}