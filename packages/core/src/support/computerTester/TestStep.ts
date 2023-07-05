import { ComputerTester } from './ComputerTester'

export type TestStep = {
  handle(computerTester: ComputerTester, ...args: any[]): Promise<void>
}