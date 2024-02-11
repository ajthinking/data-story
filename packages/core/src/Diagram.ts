import { PortId } from './types/PortId'
import { Link } from './types/Link'
import { Node } from './types/Node'

export class Diagram {
  viewport = {
    x: 0,
    y: 0,
    zoom: 1
  }

  constructor(
    public nodes: Node[],
    public links: Link[],
    public nodeDefinitions: Record<string, Diagram> = {}
  ) {}

  linksConnectedToPortId(id: PortId | undefined): Link[] {
    return this.links.filter(link => link.sourcePortId === id || link.targetPortId === id)
  }

  nodeWithInputPortId(portId: PortId): Node | undefined {
    return this.nodes.find(node => {
      return node.inputs.find(input => input.id === portId)
    })
  }

  nodeWithOutputPortId(portId: PortId): Node | undefined {
    return this.nodes.find(node => {
      return node.outputs.find(output => output.id === portId)
    })
  }

  linksAtInput(node: Node, name: string): Link[] {
    const port = node.inputs.find(input => input.name === name)!

    return this.linksConnectedToPortId(port.id)
  }

  linksAtOutput(node: Node, name: string): Link[] {
    const port = node.outputs.find(input => input.name === name)!

    return this.linksConnectedToPortId(port.id)
  }

  directAncestor(node: Node): Node[] {
    const inputLinks = node.inputs.flatMap(input => this.linksConnectedToPortId(input.id))
    const outputPortIds = inputLinks.map(link => link.sourcePortId)
    return outputPortIds.map(portId => this.nodeWithOutputPortId(portId)!)
  }

  directDescendant(node: Node): Node[] {
    const outputLinks = node.outputs.flatMap(output => this.linksConnectedToPortId(output.id))
    const inputPortIds = outputLinks.map(link => link.targetPortId)

    return inputPortIds.map(portId => this.nodeWithInputPortId(portId)!)
  }
}