import { OperatorElementConfig, PortProvider } from '../circuitElement';
import { EMPTY, Observable } from 'rxjs';
import { Operator } from './operator';
import { CreateOutputPort } from './nodePorts';

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

export const Link: OperatorElementConfig = {
  boot: (param: unknown) => {
    const { from, to } = param as {from: string, to: string};
    const createLinkOutput: CreateOutputPort = (input) => {
      return new LinkNodePorts(input.getPort(from), to);
    }

    return new Operator(createLinkOutput);
  }
}
