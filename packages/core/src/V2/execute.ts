import { Observable, Subject, merge } from 'rxjs'
import { ItemValue } from '../types/ItemValue'
import { mapper } from './nodes/mapper'
import { creator } from './nodes/creator'
import { printer } from './nodes/printer'
import { Diagram } from '../Diagram'
import { Element, OperatorBootArgs } from './Element'

type NodeId = string
type PortName = string

const nodes: Record<string, Element> = {
  creator,
  mapper,
  printer,
}

// Assumes output ports are named 'output'
// Example: execute(createMapPrint)
export const execute = async (diagram: Diagram) => {
  // **************************************************
  // 1. Some algoritm creates all subjects (output ports)
  // **************************************************
  const outputMap: {
    [key: NodeId]: {
      [key: PortName]: any
    }
  } = {};

  for(const node of diagram.nodes) {
    outputMap[node.id] = {}

    for(const output of node.outputs) {
      outputMap[node.id][output.name] = new Subject<ItemValue[]>()
    }
  }

  // **************************************************
  // 2. Some algorithm compiles OPERATOR boot args and runs them
  // **************************************************
  const operatorNodes = diagram.nodes
    .filter(node => node.inputs.length > 0)

  for(const operatorNode of operatorNodes) {
    const operator = nodes[operatorNode.type]
    const operatorArgs: OperatorBootArgs = {
      inputs: {},
      outputs: {},
    }

    for(const input of operatorNode.inputs) {
      const inputName = input.name
      const links = diagram.linksAtInput(operatorNode, input.name)
      const sourceNodes = links.map(link => diagram.nodeWithOutputPortId(link.sourcePortId)!)

      operatorArgs.inputs[inputName] = merge<ItemValue[][]>(
        ...sourceNodes.map(sourceNode => outputMap[sourceNode.id]['output'].asObservable())
      )
    }

    for(const output of operatorNode.outputs) {
      operatorArgs.outputs[output.name] = outputMap[operatorNode.id][output.name]
    }

    await operator.boot(operatorArgs)
  }

  // **************************************************
  // 3. Start the source nodes
  // **************************************************
  const sourceNodes = diagram.nodes.filter(node => node.inputs.length === 0)
  for(const sourceNode of sourceNodes) {
    const source = nodes[sourceNode.type]

    await source.boot({
      inputs: {},
      outputs: {
        output: outputMap[sourceNode.id]['output']
      }
    })
  }
}