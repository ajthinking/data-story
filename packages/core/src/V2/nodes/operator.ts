import { OperatorElement, PortProvider } from '../circuitElement';

import { CreateOutputPort } from './elementPorts';
import { composeOperators } from '../processDiagram';

export class Operator implements OperatorElement {

  elementType = 'operator' as const;

  constructor(private createOutputPort: CreateOutputPort, public elementName: string) {
  }

  getOutput(inputs: PortProvider): PortProvider {
    return this.createOutputPort(inputs);
  }
}

export class ComposedOperator implements OperatorElement {

  elementType = 'operator' as const;

  constructor(private operators: OperatorElement[], public elementName: string) {
  }

  getOutput(inputs: PortProvider): PortProvider {
    return composeOperators(this.operators, inputs);
  }
}
