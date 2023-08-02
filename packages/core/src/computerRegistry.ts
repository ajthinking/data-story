import * as computerConfigFactories from './computers'
import { Computer } from './types/Computer';
import { ComputerFactory } from './ComputerFactory';
import { NodeDescriptionFactory } from './NodeDescriptionFactory';

/**
 * The internal registry of all computers
 */
const computers = (() => {
  const map = new Map<string, Computer>()

  for(const configFactory of Object.values(computerConfigFactories)) {
    const config = configFactory()
    const computer = ComputerFactory.get(config)
    
    map.set(computer.name, computer)
  }
  
  return map
})()

const savedFlows: string[] = []

/**
 * The public registry of all computers
 */
export const ComputerRegistry = {
  all() {
    return computers
  },
}