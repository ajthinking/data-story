import { Diagram, Link, Param } from '@data-story/core'
import { ReactFlowJsonObject } from 'reactflow'
import { NodeFactory } from './NodeFactory'

export type ReactFlowJsonObjectWithParams = ReactFlowJsonObject & {
  params: Param[]
}

export const DiagramFactory = {
  fromReactFlowObject(flow: ReactFlowJsonObjectWithParams): Diagram {
    const nodes = flow.nodes.map(NodeFactory.fromReactFlowNode)

    const links: Link[] = flow.edges.map(edge => {
      return {
        id: edge.id,
        sourcePortId: edge.sourceHandle!,
        targetPortId: edge.targetHandle!
      }
    })

    const params = flow.params

    return new Diagram({ nodes, links, params })
  }
}