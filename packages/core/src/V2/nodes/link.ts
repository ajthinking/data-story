import { OperatorElement, OperatorElementConfig, PortProvider } from '../circuitElement';
import { EMPTY, Observable } from 'rxjs';
import { ComposedOperator, Operator } from './operator';
import { CreateOutputPort } from './elementPorts';

export class LinkElementPorts implements PortProvider {
  constructor(private fromPort: Observable<unknown>, private toPortName: string) {
  }

  getPort(portName: string): Observable<unknown> {
    if (portName === this.toPortName) {
      return this.fromPort;
    }
    return EMPTY;
  }
}

export const link: OperatorElementConfig = {
  boot: (param: unknown) => {
    const { from, to, middleware } = param as {from: string, to: string, middleware?: OperatorElement[]};
    const createLinkOutput: CreateOutputPort = (input) => {
      const linkMiddleware = new LinkElementPorts(input.getPort(from), 'pipe');
      const composedOperator = new ComposedOperator(middleware ?? [], 'composed');
      return new LinkElementPorts(composedOperator.getOutput(linkMiddleware).getPort('pipe'), to);
    }

    return new Operator(createLinkOutput, 'link');
  }
}
