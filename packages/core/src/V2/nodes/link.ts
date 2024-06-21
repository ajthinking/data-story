// transfer output port to input port
// calculate the items count

import { INodePorts, IOperatorNodeConfig } from '../Node';
import { CreateOutputPort, NodePorts, OperatorNode } from './sleep';
import { EMPTY, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export class LinkNodePorts implements INodePorts {
  private output: Observable<unknown>;
  constructor(private input: Observable<unknown>) {
    this.output = this.input;
  }

  getPort(portName: string): Observable<unknown> {
    if (portName === 'input') {
      return this.input;
    }
    return EMPTY;
  }

  getItemsCount(): number {
    return this.input.pipe(map((i) => i))?.length;
  }
}

export const Link: IOperatorNodeConfig = {
  boot: (param: unknown) => {
    const createLinkOutput: CreateOutputPort = (input) => {
      return new LinkNodePorts(input.getPort('output'));
    }

    return new OperatorNode(createLinkOutput);
  }
}
