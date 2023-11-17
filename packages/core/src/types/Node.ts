import { ParamV3 } from '../ParamV3'
import { Port } from './Port'

export type NodeId = string

export type Node = {
  id: NodeId
  type: string
  label?: string
  inputs: Port[]
  outputs: Port[]
  params: ParamV3[]
  position?: {
    x: number,
    y: number,
  }
}