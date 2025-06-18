import { Diagram } from './Diagram'
import { Param, StringableInputValue } from './Param'
import { NestedNodes } from './Registry'
import { ExecutableDiagram } from './ExecutableDiagram'
import { Node, NodeId } from './types/Node'
import { isStringableParam } from './utils/isStringableParam';

export const createExecutableDiagram = (
  diagram: Diagram,
  nestedNodes: NestedNodes,
): ExecutableDiagram => {
  const { unfoldedGlobalParams } = unfoldDiagram(diagram, nestedNodes)
  connectLoops(diagram)

  return {
    diagram,
    unfoldedGlobalParams,
  }
}

// Helper to extract port_name param value from a node
function getPortName(node: any): string | undefined {
  const param = node.params?.find((p: any) => p.name === 'port_name');
  // Support both StringableParam and plain param
  return param && (param.value ?? (param.input && param.input.rawValue));
}

const connectLoops = (diagram: Diagram) => {
  const loopBacks = diagram.nodes.filter(n => n.name === 'LoopBack');
  const loopStarts = diagram.nodes.filter(n => n.name === 'LoopStart');

  for (const loopBack of loopBacks) {
    const loopBackPortName = getPortName(loopBack);
    if (!loopBackPortName) continue;
    const targetLoopStart = loopStarts.find(loopStart => getPortName(loopStart) === loopBackPortName);
    if (!targetLoopStart) continue;

    // Find output port on LoopBack and input port on LoopStart
    const outputPort = loopBack.outputs?.[0]?.id;
    const inputPort = targetLoopStart.inputs?.[0]?.id;
    if (!outputPort || !inputPort) continue;

    // Add the link if it doesn't already exist
    const exists = diagram.links.some(l => l.sourcePortId === outputPort && l.targetPortId === inputPort);
    if (!exists) {
      diagram.links.push({
        id: `${loopBack.id}:${outputPort}->${targetLoopStart.id}:${inputPort}`,
        sourcePortId: outputPort,
        targetPortId: inputPort,
      });
    }
  }
}

export const unfoldDiagram = (diagram: Diagram, nestedNodes: NestedNodes): ExecutableDiagram => {
  const replacables = diagram.nodes.filter(node => node.name in nestedNodes)

  const unfoldedGlobalParams: Record<NodeId, Param[]> = {}

  for(const node of replacables) {
    const nestedDiagram = nestedNodes[node.name]
    if(!nestedDiagram) throw new Error(`No nesteddiagram found for node type "${node.name}"`)

    diagram.nodes.push(...nestedDiagram.nodes)
    diagram.links.push(...nestedDiagram.links)

    // Register the unfold map
    for(const replacer of nestedDiagram.nodes) {
      unfoldedGlobalParams[replacer.id] = structuredClone(node.params)
    }

    unfoldNode(node, diagram, nestedNodes, unfoldedGlobalParams)
  }

  return {
    diagram,
    unfoldedGlobalParams,
  }
}

const unfoldNode = (node: Node, diagram: Diagram, nestedNodes: NestedNodes, unfoldedGlobalParams: Record<NodeId, Param[]>) => {
  const index = diagram.nodes.indexOf(node)
  if(index === -1) throw new Error('Node not found in diagram')
  diagram.nodes.splice(index, 1)

  const nestedDiagram = nestedNodes[node.name]
  if(!nestedDiagram) throw new Error(`No nesteddiagram found for node type "${node.name}"`)

  // Rewire incoming links
  for(const inputPort of node.inputs) {
    const links = diagram.linksAtInput(node, inputPort.name)

    for(const link of links) {
      const newTargetNode = nestedDiagram.nodes
        .find(node => {
          const isInputNode = node.name === 'Input'
          if(!isInputNode) return false;

          const param = node.params[0];
          const portName: string = isStringableParam(param?.type)
            ? (param?.input as StringableInputValue).rawValue
            : param?.input.rawValue;
          if(!portName) throw new Error(`No port name found for input node "${node.id}". The node was ${JSON.stringify(node)}`)

          const matchesPortName = portName === inputPort.name;

          return matchesPortName
        })

      if(!newTargetNode) throw new Error(`No input node found for input port "${inputPort.name}" on the nesteddiagram of "${node.name}"`)

      const newInputPort = newTargetNode.inputs[0]
      if(!newInputPort) throw new Error(`No input port found for input port "${inputPort.name}" on the nesteddiagram of "${node.name}". The node was ${JSON.stringify(node)}`)

      link.targetPortId = newInputPort.id
    }
  }

  // Rewire outgoing links
  for(const outputPort of node.outputs) {
    const links = diagram.linksAtOutput(node, outputPort.name)
    for(const link of links) {
      const newSourceNode = nestedDiagram.nodes
        .find(node => {
          const isOutputNode = node.name === 'Output'
          if(!isOutputNode) return false;

          const param = node.params[0];
          const portName: string = isStringableParam(param?.type)
            ? (param?.input as StringableInputValue).rawValue
            : param?.input.rawValue;
          if(!portName) throw new Error(`No port name found for output node "${node.id}. The node was ${JSON.stringify(node)}"`)

          const matchesPortName = portName === outputPort.name

          return matchesPortName
        })

      if(!newSourceNode) throw new Error(`No output node found for output port "${outputPort.name}" on the nesteddiagram of "${node.name}"`)

      const newOutputPort = newSourceNode.outputs[0]
      if(!newOutputPort) throw new Error(`No output port found for output port "${outputPort.name}" on the nesteddiagram of "${node.name}"`)

      link.sourcePortId = newOutputPort.id
    }
  }
}