export type NextResult = undefined
export type ReturnResult = void | never
export type NextArgument = void

import { HooksDevice } from './HooksDevice'
import { Param } from '../Param'
import { ParamsDevice } from './ParamsDevice'
import { AbstractPort, Port } from './Port'
import { Node } from './Node'
import { InputDevice } from '../InputDevice'
import { OutputDevice } from '../OutputDevice'
import { z } from 'zod';

export interface Computer {
  type: 'Computer',
  computerType: ComputerType
  label: string
  category?: string
  inputs: AbstractPort[]
  outputs: AbstractPort[]
  params: Param[]
  run: (args: RunArgs) => AsyncGenerator<NextResult, ReturnResult, NextArgument>
  canRun?: (options: {
    isAvailable: () => boolean,
    input: InputDevice,
    params: Record<string, Param>
  }) => boolean
}

export type RunArgs = {
  input: InputDevice,
  output: OutputDevice,
  params: ParamsDevice,
  hooks: HooksDevice,
  node: Node,
  onComplete?: (fn: Function) => void
}
export const ComputerTypeSchema = z.string();
export type ComputerType = z.infer<typeof ComputerTypeSchema>;