import { Param } from '../Param'
import { Port } from './Port'

export type NodeId = string

export type Node = {
  id: NodeId
  type: string
  label?: string
  color?: string
  inputs: Port[]
  outputs: Port[]
  params: Param[]
  position?: {
    x: number,
    y: number,
  }
}