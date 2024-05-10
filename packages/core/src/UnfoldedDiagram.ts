import { Diagram } from './Diagram'
import { Param } from './Param'
import { NodeId } from './types/Node'

export type UnfoldedDiagram = {
  diagram: Diagram
  unfoldedGlobalParams: Record<NodeId, Param[]>
}