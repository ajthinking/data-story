import { PortProvider, IOperatorNode, IOperatorNodeConfig } from '../Node';
import { EMPTY, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

export class NodePorts implements PortProvider {
  constructor(private output: Observable<unknown>) {
  }

  getPort(portName: string): Observable<unknown> {
    if (portName === 'output') {
      return this.output;
    }
    return EMPTY;
  }
}

export type CreateOutputPort = (input: PortProvider) => PortProvider;

export class Operator implements IOperatorNode {

  nodeType = 'operator' as const;

  constructor(private createOutputPort: CreateOutputPort) {
  }

  getOutput(inputs: PortProvider): PortProvider {
    return this.createOutputPort(inputs);
  }
}

export const Sleep: IOperatorNodeConfig = {
  boot: (param: unknown) => {
    const duration = Number(param);
    let createSleepOutput: CreateOutputPort = (input) => new NodePorts(input.getPort('input').pipe(delay(duration)));
    return new Operator(createSleepOutput);
  }
}
