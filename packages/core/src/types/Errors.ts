import { Node } from './Node';

export class NodeExecutionError extends Error {
  constructor(message: string, public node: Pick<Node, 'id' | 'label' | 'type'>) {
    super(`Error in node ${node.label || node.id} (${node.type}): ${message}`);
    this.name = 'NodeExecutionError';
  }
}
