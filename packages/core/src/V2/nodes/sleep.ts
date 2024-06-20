import { INodePorts, IOperatorNode, IOperatorNodeConfig } from '../Node';
import { EMPTY, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

export class NodePorts implements INodePorts {
  constructor(private output: Observable<unknown>) {
  }

  getPort(portName: string): Observable<unknown> {
    if (portName === 'output') {
      return this.output;
    }
    return EMPTY;
  }
}

export type CreateOutputPort = (input: INodePorts) => INodePorts;

export class OperatorNode implements IOperatorNode {

  nodeType = 'operator' as const;

  constructor(private createOutputPort: CreateOutputPort) {
  }

  getOutput(inputs: INodePorts): INodePorts {
    return this.createOutputPort(inputs);
  }
}

export const Sleep: IOperatorNodeConfig = {
  boot: (param: unknown) => {
    const duration = Number(param);
    let createSleepOutput: CreateOutputPort = (input) => new NodePorts(input.getPort('input').pipe(delay(duration)));
    return new OperatorNode(createSleepOutput);
  }
}
