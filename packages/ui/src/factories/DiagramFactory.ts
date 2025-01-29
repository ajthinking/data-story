import { Diagram, Link, Param } from '@data-story/core'
import { ReactFlowJsonObject } from '@xyflow/react'
import { NodeFactory } from './NodeFactory'
import { ReactFlowNode } from '../components/Node/ReactFlowNode';

export type ReactFlowJsonObjectWithParams = ReactFlowJsonObject<ReactFlowNode> & {
  params: Param[]
}

export const DiagramFactory = {
  fromReactFlowObject(flow: ReactFlowJsonObjectWithParams): Diagram {
    const nodes = flow.nodes.map(NodeFactory.fromReactFlowNode)

    const links: Link[] = flow.edges.map(edge => {
      return {
        id: edge.id,
        sourcePortId: edge.sourceHandle!,
        targetPortId: edge.targetHandle!,
        label: edge.label,
        labelBgStyle: edge.labelBgStyle,
      }
    })

    const params = flow.params

    return new Diagram({ nodes, links, params })
  },
}
