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

  linksAtInputPortId(id: PortId | undefined): Link[] {
    return this.links.filter(link => link.targetPortId === id)
  }

  linksAtOutputPortId(id: PortId | undefined): Link[] {
    return this.links.filter(link => link.sourcePortId === id)
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

    return this.linksAtInputPortId(port.id)
  }

  linksAtOutput(node: Node, name: string): Link[] {
    const port = node.outputs.find(input => input.name === name)!

    return this.linksAtOutputPortId(port.id)
  }

  directAncestor(node: Node): Node[] {
    const inputLinks = node.inputs.flatMap(input => this.linksAtInputPortId(input.id))
    const outputPortIds = inputLinks.map(link => link.sourcePortId)
    return outputPortIds.map(portId => this.nodeWithOutputPortId(portId)!)
  }

  directDescendant(node: Node): Node[] {
    const outputLinks = node.outputs.flatMap(output => this.linksAtOutputPortId(output.id))
    const inputPortIds = outputLinks.map(link => link.targetPortId)

    return inputPortIds.map(portId => this.nodeWithInputPortId(portId)!)
  }

  inputNodes(): Node[] {
    return this.nodes.filter(node => node.type === 'Input')
  }

  outputNodes(): Node[] {
    return this.nodes.filter(node => node.type === 'Output')
  }

  unfold(): Diagram {
    const replacables = this.nodes.filter(node => node.type in this.nodeDefinitions)

    for(const type of new Set(replacables.map(node => node.type))) {
      const subDiagram = this.nodeDefinitions[type]
      if(!subDiagram) throw new Error(`No subdiagram found for node type "${type}"`)

      this.nodes.push(...subDiagram.nodes)
      this.links.push(...subDiagram.links)
    }

    for(const node of replacables) {
      this.unfoldNode(node)
    }

    return this;
  }

  unfoldNode(node: Node): Diagram {
    const index = this.nodes.indexOf(node)
    if(index === -1) throw new Error('Node not found in diagram')
    this.nodes.splice(index, 1)

    const subDiagram = this.nodeDefinitions[node.type]
    if(!subDiagram) throw new Error(`No subdiagram found for node type "${node.type}"`)

    // Rewire incoming links
    for(const inputPort of node.inputs) {
      const links = this.linksAtInput(node, inputPort.name)
      for(const link of links) {
        const newTargetNode = subDiagram.nodes
          .filter(node => node.type === 'Input')
          .find(node => {
            return node.inputs.find(input => input.name === inputPort.name)
          })

        if(!newTargetNode) throw new Error(`No input node found for input port "${inputPort.name}" on the subdiagram of "${node.type}"`)

        const newInputPort = newTargetNode.inputs.find(input => input.name === inputPort.name)
        if(!newInputPort) throw new Error(`No input port found for input port "${inputPort.name}" on the subdiagram of "${node.type}"`)

        link.targetPortId = newInputPort.id
      }
    }

    // Rewire outgoing links
    for(const outputPort of node.outputs) {
      const links = this.linksAtOutput(node, outputPort.name)
      for(const link of links) {
        const newSourceNode = subDiagram.nodes
          .filter(node => node.type === 'Output')
          .find(node => {
            return node.outputs.find(output => output.name === outputPort.name)
          })

        if(!newSourceNode) throw new Error(`No output node found for output port "${outputPort.name}" on the subdiagram of "${node.type}"`)

        const newOutputPort = newSourceNode.outputs.find(output => output.name === outputPort.name)
        if(!newOutputPort) throw new Error(`No output port found for output port "${outputPort.name}" on the subdiagram of "${node.type}"`)

        link.sourcePortId = newOutputPort.id
      }
    }

    return this;
  }
}