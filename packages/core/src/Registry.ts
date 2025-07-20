import { Diagram } from './Diagram';
import { Computer, ComputerType } from './types/Computer';

export type ComputerRecord = Record<ComputerType, Computer>
export type ConfiguredComputerAliases = Computer[]
export type NestedNodesRecord = Record<string, Diagram>

export class Registry {
  computers: ComputerRecord = {};
  configuredComputerAliases: ConfiguredComputerAliases = [];
  nestedNodes: NestedNodesRecord = {};

  constructor(
    computers: ComputerRecord,
    nestedNodes: NestedNodesRecord,
    configuredComputerAliases: ConfiguredComputerAliases,
  ) {
    this.computers = computers;
    this.nestedNodes = nestedNodes;
    this.configuredComputerAliases = configuredComputerAliases;
  }
}