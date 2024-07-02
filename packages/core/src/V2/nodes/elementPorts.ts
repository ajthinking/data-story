import { PortProvider } from '../circuitElement';
import { EMPTY, Observable } from 'rxjs';

export class ElementPorts implements PortProvider {
  private ports: Map<string, Observable<unknown>> = new Map();

  constructor(output?: Observable<unknown>) {
    if (output) {
      this.ports.set('output', output);
    }
  }

  getPort(portName: string): Observable<unknown> {
    return this.ports.get(portName) || EMPTY;
  }

  static fromPorts(param: Record<string, Observable<unknown>>): any {
    const elementsPorts = new ElementPorts();
    Object.keys(param).forEach((key) => {
      elementsPorts.ports.set(key, param[key]);
    });
    return elementsPorts;
  }
}

export type CreateOutputPort = (input: PortProvider) => PortProvider;
