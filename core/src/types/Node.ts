import { Param } from '../Param'
import { Port } from '../types/Port'

export type NodeId = string

export type Node = {
  id: NodeId
  type: string
  inputs: Port[]
  outputs: Port[]
  params: Record<string, Param>
  position?: {
    x: number,
    y: number,
  }
}