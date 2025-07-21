import { Diagram } from './Diagram';
import { Computer, ComputerType } from './types/Computer';
import { NodeDescription } from './types/NodeDescription';

export type ComputerRecord = Record<ComputerType, Computer>
export type ConfiguredComputerAlias = {
  type: string,
  aliasFactory: (original: NodeDescription) => NodeDescription,
}
export type ConfiguredComputerAliases = ConfiguredComputerAlias[]
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