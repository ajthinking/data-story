import { PortProvider } from '../circuitElement';
import { EMPTY, Observable } from 'rxjs';

export class ElementPorts implements PortProvider {
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
