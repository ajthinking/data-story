import { NextArgument, NextResult, ReturnResult, RunArgs } from './Computer'
import { InputDeviceInterface } from './InputDeviceInterface'
import { Param } from '../Param'
import { AbstractPort, PortName } from './Port'

/**
 * Provides a simple way to create a computer
 */
export interface ComputerConfig {
  name?: string
  label?: string
  category?: string
  inputs?: (PortName  | AbstractPort)[]
  outputs?: (PortName | AbstractPort)[]
  params?: Record<string, Param>
  tags?: string[]

  run: (args: RunArgs) => AsyncGenerator<NextResult, ReturnResult, NextArgument>
  
  canRun?: (options: {
    isAvailable: () => boolean,
    input: InputDeviceInterface,
  }) => boolean  
}