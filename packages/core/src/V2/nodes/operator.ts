import { OperatorNode, PortProvider } from '../Node';

import { CreateOutputPort } from './nodePorts';

export class Operator implements OperatorNode {

  nodeType = 'operator' as const;

  constructor(private createOutputPort: CreateOutputPort) {
  }

  getOutput(inputs: PortProvider): PortProvider {
    return this.createOutputPort(inputs);
  }
}
