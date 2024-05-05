import { Diagram } from './Diagram';
import { Computer } from './types/Computer';

export type NodeName = string
export type NestedNodes = Record<NodeName, Diagram>

export type ComputerName = string
export type ComputerRecord = Record<ComputerName, Computer>

export class Registry {
  computers: ComputerRecord = {};
  nestedNodes: NestedNodes = {};

  constructor(
    computers: ComputerRecord,
    nestedNodes: NestedNodes
  ) {
    this.computers = computers;
    this.nestedNodes = nestedNodes;
  }
}