import { OperatorElement, PortProvider } from '../circuitElement';

import { CreateOutputPort } from './elementPorts';

export class Operator implements OperatorElement {

  elementType = 'operator' as const;

  constructor(private createOutputPort: CreateOutputPort, public elementName: string) {
  }

  getOutput(inputs: PortProvider): PortProvider {
    return this.createOutputPort(inputs);
  }
}
