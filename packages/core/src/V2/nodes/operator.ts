import { OperatorElement, PortProvider } from '../circuitElement';

import { CreateOutputPort } from './nodePorts';

export class Operator implements OperatorElement {

  elementType = 'operator' as const;

  constructor(private createOutputPort: CreateOutputPort) {
  }

  getOutput(inputs: PortProvider): PortProvider {
    return this.createOutputPort(inputs);
  }
}
