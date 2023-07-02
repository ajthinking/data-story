import { Computer, NextArgument, NextResult, PortName, ReturnResult, RunArgs } from './Computer'
import { InputDeviceInterface } from './InputDeviceInterface'
import { Param } from '../Param'
import { PortWithSchema } from './PortWithSchema'

/**
 * Provides a simple way to create a computer
 */
export interface ComputerConfig {
  name?: string
  label?: string
  category?: string
  inputs?: (PortName  | PortWithSchema)[]
  outputs?: (PortName | PortWithSchema)[]
  params?: Record<string, Param>
  tags?: string[]

  run: (args: RunArgs) => AsyncGenerator<NextResult, ReturnResult, NextArgument>
  
  canRun?: (options: {
    isAvailable: () => boolean,
    input: InputDeviceInterface,
  }) => boolean  
}