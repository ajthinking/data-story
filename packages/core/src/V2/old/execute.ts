import { Observable, Subject, merge } from 'rxjs'
import { ItemValue } from '../../types/ItemValue'
import { mapper } from '../nodes/mapper'
import { creator } from '../nodes/creator'
import { printer } from '../nodes/printer'
import { Diagram } from '../../Diagram'
import { Element, OperatorBootArgs } from './Element'
import { slowCreator } from '../nodes/slowCreator'
import { sleeper } from '../nodes/sleeper'

type NodeId = string
type PortName = string

const nodes: Record<string, Element> = {
  creator,
  mapper,
  printer,
  slowCreator,
  sleeper,
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
    if(!operator) throw new Error(`Operator ${operatorNode.type} not found`)
    const operatorArgs: OperatorBootArgs = {
      inputs: {},
      outputs: {},
    }

    for(const input of operatorNode.inputs) {
      const inputName = input.name
      const links = diagram.linksAtInput(operatorNode, input.name)
      const observables = links.map(link => {
        const sourceNode = diagram.nodeWithOutputPortId(link.sourcePortId)
        if(!sourceNode) return;
        const sourcePortId = link.sourcePortId
        const portName = sourceNode.outputs.find(output => output.id === sourcePortId)!.name
        return outputMap[sourceNode.id][portName].asObservable()
      })

      operatorArgs.inputs[inputName] = merge<ItemValue[][]>(
        ...observables
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