import { PortProvider, IOperatorNodeConfig } from '../Node';
import { CreateOutputPort, NodePorts, Operator } from './sleep';
import { EMPTY, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export class LinkNodePorts implements PortProvider {
  constructor(private fromPort: Observable<unknown>, private toPortName: string) {
  }

  getPort(portName: string): Observable<unknown> {
    if (portName === this.toPortName) {
      return this.fromPort;
    }
    return EMPTY;
  }
}

export const Link: IOperatorNodeConfig = {
  boot: (param: unknown) => {
    const { from, to } = param as { from: string, to: string };
    const createLinkOutput: CreateOutputPort = (input) => {
      return new LinkNodePorts(input.getPort(from), to);
    }

    return new Operator(createLinkOutput);
  }
}
