export type NextResult = undefined
export type ReturnResult = void | never
export type NextArgument = void

import { HooksDevice } from './HooksDevice'
import { Param } from '../Param'
import { ParamsDevice } from './ParamsDevice'
import { AbstractPort, Port } from './Port'
import { Storage } from './Storage'
import { Diagram } from '../Diagram'
import { Executor } from '../Executor'
import { Node } from './Node'
import { InputDevice } from '../InputDevice'
import { OutputDevice } from '../OutputDevice'
import { UnfoldedDiagram } from '../UnfoldedDiagram'

export type RunArgs = {
  input: InputDevice,
  output: OutputDevice,
  params: ParamsDevice,
  storage?: Storage,
  hooks: HooksDevice,
  node: Node,
  unfoldedDiagram: UnfoldedDiagram,
}

export interface Computer {
  name: string
  label: string
  docs?: string
  category?: string
  inputs: AbstractPort[]
  outputs: AbstractPort[]
  params: Param[]
  tags: string[]

  run: (args: RunArgs) => AsyncGenerator<NextResult, ReturnResult, NextArgument>
  canRun?: (options: {
    isAvailable: () => boolean,
    input: InputDevice,
    params: Record<string, Param>
  }) => boolean
}