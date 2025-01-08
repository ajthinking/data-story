import { PortId } from './PortId'

export type PortName = string

export type AbstractPort = {
  name: PortName,
  schema: {
    [key: string]: any,
  },
}

export type Port = {
  id: PortId,
  name: PortName,
  schema: {
    [key: string]: any,
  },
}