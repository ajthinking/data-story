import { Diagram } from './Diagram'
import { NodeId } from './types/Node'

export type UnfoldedDiagram = {
  diagram: Diagram
  unfoldMap: Record<NodeId, NodeId>
}