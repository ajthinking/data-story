export type NextResult = undefined
export type ReturnResult = void | never
export type NextArgument = void
export type PortName = string

import { ComputerConfig } from './ComputerConfig'
import { HooksDevice } from './HooksDevice'
import { InputDeviceInterface } from './InputDeviceInterface'
import { OutputDeviceInterface } from '../OutputDevice'
import { Param } from '../Param'
import { ParamsDevice } from './ParamsDevice'
import { PortWithSchema } from './PortWithSchema'
import { Storage } from './Storage'
import { Diagram } from '../Diagram'
import { Executor } from '../Executor'

export type RunArgs = {
  input: InputDeviceInterface,
  output: OutputDeviceInterface,
  params: ParamsDevice,
  storage?: Storage,
  hooks: HooksDevice,
  executorFactory?: (diagram: Diagram) => Executor,
}

export interface Computer {
  name: string
  label: string
  category?: string
  inputs: PortWithSchema[]
  outputs: PortWithSchema[]
  params: Record<string, Param>
  tags: string[]

  run: (args: RunArgs) => AsyncGenerator<NextResult, ReturnResult, NextArgument>
  canRun?: (options: {
    isAvailable: () => boolean,
    input: InputDeviceInterface,
  }) => boolean
}

export type ComputerConfigFactory = (options?: any) => ComputerConfig