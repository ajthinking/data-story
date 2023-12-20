import { Diagram, Node, Link } from '@data-story/core'
import { SerializedReactFlow, SerializedReactFlowNode } from './SerializedReactFlow'

export const reactFlowNodeToDiagramNode = (flowNode: SerializedReactFlowNode): Node => {
  return {
    id: flowNode.id,        
    type: flowNode.data.computer,
    inputs: flowNode.data.inputs.map(input => {
      return {
        id: input.id,
        name: input?.id?.split('.').pop()!,
        schema: input.schema,
      }
    }),
    outputs: flowNode.data.outputs.map(output => {
      return {
        id: output.id,
        name: output?.id?.split('.').pop()!,
        schema: output.schema,
      }
    }),
    params: flowNode.data.params || {},
    position: flowNode.position,
  }
}  

export const reactFlowToDiagram = (flow: SerializedReactFlow): Diagram => {
  const nodes = flow.nodes.map(flowNode => {
    return {
      id: flowNode.id,        
      type: flowNode.data.computer,
      docs: flowNode.data.docs,
      inputs: flowNode.data.inputs.map(input => {
        return {
          id: input.id,
          name: input?.id?.split('.').pop()!,
          schema: input.schema,
        }
      }),
      outputs: flowNode.data.outputs.map(output => {
        return {
          id: output.id,
          name: output?.id?.split('.').pop()!,
          schema: output.schema,
        }
      }),
      params: flowNode.data.params || [],
      position: flowNode.position,
    }
  })

  const links: Link[] = flow.edges.map(edge => {
    return {
      id: edge.id,
      sourcePortId: edge.sourceHandle!,
      targetPortId: edge.targetHandle!
    }
  })

  return new Diagram(nodes, links)
}