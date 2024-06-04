import { Diagram } from './Diagram'
import { Param, StringableInputValue } from './Param'
import { NestedNodes } from './Registry'
import { UnfoldedDiagram } from './UnfoldedDiagram'
import { Node, NodeId } from './types/Node'
import { isStringableParam } from './utils/isStringableParam';

export class UnfoldedDiagramFactory {
  public unfoldedGlobalParams: Record<NodeId, Param[]> = {}
  constructor(
    public diagram: Diagram,
    public nestedNodes: NestedNodes
  ) {}

  static create(
    diagram: Diagram,
    nestedNodes: NestedNodes
  ): UnfoldedDiagram {
    const instance = new this(diagram, nestedNodes)
    instance.unfold()

    return {
      diagram,
      unfoldedGlobalParams: instance.unfoldedGlobalParams,
    }
  }

  unfold(): UnfoldedDiagram {
    const replacables = this.diagram.nodes.filter(node => node.type in this.nestedNodes)

    for(const node of replacables) {
      const nestedDiagram = this.nestedNodes[node.type]
      if(!nestedDiagram) throw new Error(`No nesteddiagram found for node type "${node.type}"`)

      this.diagram.nodes.push(...nestedDiagram.nodes)
      this.diagram.links.push(...nestedDiagram.links)

      // Register the unfold map
      for(const replacer of nestedDiagram.nodes) {
        this.unfoldedGlobalParams[replacer.id] = structuredClone(node.params)
      }

      this.unfoldNode(node)
    }

    return {
      diagram: this.diagram,
      unfoldedGlobalParams: this.unfoldedGlobalParams,
    }
  }

  unfoldNode(node: Node) {
    const index = this.diagram.nodes.indexOf(node)
    if(index === -1) throw new Error('Node not found in diagram')
    this.diagram.nodes.splice(index, 1)

    const nestedDiagram = this.nestedNodes[node.type]
    if(!nestedDiagram) throw new Error(`No nesteddiagram found for node type "${node.type}"`)

    // Rewire incoming links
    for(const inputPort of node.inputs) {
      const links = this.diagram.linksAtInput(node, inputPort.name)

      for(const link of links) {
        const newTargetNode = nestedDiagram.nodes
          .find(node => {
            const isInputNode = node.type === 'Input'
            if(!isInputNode) return false;

            const param = node.params[0];
            const portName: string = isStringableParam(param?.type) ? (param?.value as StringableInputValue).value : param?.value;
            if(!portName) throw new Error(`No port name found for input node "${node.id}". The node was ${JSON.stringify(node)}`)

            const matchesPortName = portName === inputPort.name;

            return matchesPortName
          })

        if(!newTargetNode) throw new Error(`No input node found for input port "${inputPort.name}" on the nesteddiagram of "${node.type}"`)

        const newInputPort = newTargetNode.inputs[0]
        if(!newInputPort) throw new Error(`No input port found for input port "${inputPort.name}" on the nesteddiagram of "${node.type}". The node was ${JSON.stringify(node)}`)

        link.targetPortId = newInputPort.id
      }
    }

    // Rewire outgoing links
    for(const outputPort of node.outputs) {
      const links = this.diagram.linksAtOutput(node, outputPort.name)
      for(const link of links) {
        const newSourceNode = nestedDiagram.nodes
          .find(node => {
            const isOutputNode = node.type === 'Output'
            if(!isOutputNode) return false;

            const param = node.params[0];
            const portName: string = isStringableParam(param?.type) ? (param?.value as StringableInputValue).value : param?.value;
            if(!portName) throw new Error(`No port name found for output node "${node.id}. The node was ${JSON.stringify(node)}"`)

            const matchesPortName = portName === outputPort.name

            return matchesPortName
          })

        if(!newSourceNode) throw new Error(`No output node found for output port "${outputPort.name}" on the nesteddiagram of "${node.type}"`)

        const newOutputPort = newSourceNode.outputs[0]
        if(!newOutputPort) throw new Error(`No output port found for output port "${outputPort.name}" on the nesteddiagram of "${node.type}"`)

        link.sourcePortId = newOutputPort.id
      }
    }
  }
}
