import { Param } from '../Param'
import { PortWithSchema } from './PortWithSchema'

export type NodeId = string

export type Node = {
  id: NodeId
  type: string
  inputs: PortWithSchema[]
  outputs: PortWithSchema[]
  params: Record<string, Param>
  position?: {
    x: number,
    y: number,
  }
}