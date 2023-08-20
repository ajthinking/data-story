export type PortName = string

export type AbstractPort = {
  name: PortName,
  schema: {
    [key: string]: any,
  },
}

export type Port = {
  id: string,
  name: PortName,
  schema: {
    [key: string]: any,
  },
}