import { NextArgument, NextResult, ReturnResult, RunArgs } from './Computer'
import { AbstractPort, PortName } from './Port'
import { Param } from '../Param'
import { InputDevice } from '../InputDevice'

/**
 * Provides a simple way to create a computer
 */
export interface ComputerConfig {
  name?: string
  label?: string
  docs?: string
  category?: string
  inputs?: (PortName  | AbstractPort)[]
  outputs?: (PortName | AbstractPort)[]
  params?: Param[]
  tags?: string[]

  run: (args: RunArgs) => AsyncGenerator<NextResult, ReturnResult, NextArgument>

  canRun?: (options: {
    isAvailable: () => boolean,
    input: InputDevice,
    params: Record<string, Param>
  }) => boolean
}