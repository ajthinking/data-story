import { ISourceNodeConfig, INodePorts, ISourceNode } from '../Node';
import { Observable, EMPTY, interval } from 'rxjs';
import { map, take } from 'rxjs/operators';

export class SignalNodePorts implements INodePorts {

  constructor(public params:{ period: number, count: number, expression: (i: number) =>  unknown}) {
  }

  getPort(portName: string): Observable<unknown> {
    if (portName === 'output') {
      return interval(this.params.period)
        .pipe(
          take(this.params.count),
          map((i) => {
            return this.params.expression(i)
          })
        );
    } else {
      return EMPTY;
    }
  }
}

export class SourceNode implements ISourceNode {

  private outputPorts: INodePorts;

  constructor(initialOutputPorts: INodePorts) {
    this.outputPorts = initialOutputPorts;
  }

  getOutput(): INodePorts {
    return this.outputPorts;
  }
  nodeType = 'source' as const;

}

interface SignalNodeParams  {
  period?: number,
  count?: number,
  expression?: (i: number) => unknown
}

export const Signal: ISourceNodeConfig = {
  boot: (param: unknown): ISourceNode  => {
    const signalNodeParams = param as SignalNodeParams;
    const period = Number(signalNodeParams?.period)
    const count = Number(signalNodeParams?.count)
    const expression = signalNodeParams?.expression ?? ((i: number) => { return  { id: i + 1 } });
    return new SourceNode(new SignalNodePorts({
      period,
      count,
      expression
    }));
  }
}
