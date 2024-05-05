import { Diagram } from './Diagram'
import { UnfoldedDiagram } from './UnfoldedDiagram'
import { Node } from './types/Node'

export class UnfoldedDiagramFactory {
  constructor(
    public diagram: Diagram,
    public nestedNodes: Record<string, Diagram>
  ) {}

  static create(
    diagram: Diagram,
    nestedNodes: Record<string, Diagram>
  ): UnfoldedDiagram {
    const instance = new this(diagram, nestedNodes)
    instance.unfold()

    return {
      diagram,
      unfoldMap: {},
    }
  }

  unfold(): UnfoldedDiagram {
    const replacables = this.diagram.nodes.filter(node => node.type in this.nestedNodes)

    for(const type of new Set(replacables.map(node => node.type))) {
      const subDiagram = this.nestedNodes[type]
      if(!subDiagram) throw new Error(`No subdiagram found for node type "${type}"`)

      this.diagram.nodes.push(...subDiagram.nodes)
      this.diagram.links.push(...subDiagram.links)
    }

    for(const node of replacables) {
      this.unfoldNode(node)
    }

    return {
      diagram: this.diagram,
      unfoldMap: {},
    }
  }

  unfoldNode(node: Node) {
    const index = this.diagram.nodes.indexOf(node)
    if(index === -1) throw new Error('Node not found in diagram')
    this.diagram.nodes.splice(index, 1)

    const subDiagram = this.nestedNodes[node.type]
    if(!subDiagram) throw new Error(`No subdiagram found for node type "${node.type}"`)

    // Rewire incoming links
    for(const inputPort of node.inputs) {
      const links = this.diagram.linksAtInput(node, inputPort.name)
      for(const link of links) {
        const newTargetNode = subDiagram.nodes
          .find(node => {
            const isInputNode = node.type === 'Input'
            if(!isInputNode) return false;

            const portName = node.params[0]?.value
            if(!portName) throw new Error(`No port name found for input node "${node.id}". The node was ${JSON.stringify(node)}`)

            const matchesPortName = portName === inputPort.name

            return matchesPortName
          })

        if(!newTargetNode) throw new Error(`No input node found for input port "${inputPort.name}" on the subdiagram of "${node.type}"`)

        const newInputPort = newTargetNode.inputs[0]
        if(!newInputPort) throw new Error(`No input port found for input port "${inputPort.name}" on the subdiagram of "${node.type}". The node was ${JSON.stringify(node)}`)

        link.targetPortId = newInputPort.id
      }
    }

    // Rewire outgoing links
    for(const outputPort of node.outputs) {
      const links = this.diagram.linksAtOutput(node, outputPort.name)
      for(const link of links) {
        const newSourceNode = subDiagram.nodes
          .find(node => {
            const isOutputNode = node.type === 'Output'
            if(!isOutputNode) return false;

            const portName = node.params[0]?.value
            if(!portName) throw new Error(`No port name found for output node "${node.id}. The node was ${JSON.stringify(node)}"`)

            const matchesPortName = portName === outputPort.name

            return matchesPortName
          })

        if(!newSourceNode) throw new Error(`No output node found for output port "${outputPort.name}" on the subdiagram of "${node.type}"`)

        const newOutputPort = newSourceNode.outputs[0]
        if(!newOutputPort) throw new Error(`No output port found for output port "${outputPort.name}" on the subdiagram of "${node.type}"`)

        link.sourcePortId = newOutputPort.id
      }
    }
  }
}