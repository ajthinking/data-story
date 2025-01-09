import { Param } from '../Param'
import { Port } from './Port'

export type NodeId = string

export type Node = {
  id: NodeId
  name: string
  label?: string
  inputs: Port[]
  outputs: Port[]
  params: Param[]
  position?: {
    x: number,
    y: number,
  }
}