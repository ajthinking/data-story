import { Diagram, Link } from '@data-story/core'
import { ReactFlowJsonObject } from 'reactflow'
import { NodeFactory } from './NodeFactory'

export const DiagramFactory = {
  fromReactFlowObject(flow: ReactFlowJsonObject): Diagram {
    const nodes = flow.nodes.map(NodeFactory.fromReactFlowNode)

    const links: Link[] = flow.edges.map(edge => {
      return {
        id: edge.id,
        sourcePortId: edge.sourceHandle!,
        targetPortId: edge.targetHandle!
      }
    })

    return new Diagram(nodes, links)
  }
}