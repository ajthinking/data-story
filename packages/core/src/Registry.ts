import { Diagram } from './Diagram';
import { Computer } from './types/Computer';

export class Registry {
  computers: Record<string, Computer> = {};
  nestedNodes: Record<string, Diagram> = {};

  constructor(
    computers: Record<string, Computer>,
    nestedNodes: Record<string, Diagram>
  ) {
    this.computers = computers;
    this.nestedNodes = nestedNodes;
  }
}