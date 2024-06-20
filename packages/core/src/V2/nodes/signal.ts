import { ISourceNodeConfig, INodePorts, ISourceNode } from '../Node';
import { Observable, EMPTY, interval } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { NodePorts } from './sleep';

type CreateSourceOutputPort = () => INodePorts;

export class SourceNode implements ISourceNode {

  constructor(private createOutputPort: CreateSourceOutputPort) {
  }

  getOutput(): INodePorts {
    return this.createOutputPort();
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
    const createSignalOutput: CreateSourceOutputPort = () => new NodePorts(interval(period)
      .pipe(
        take(count),
        map((i) => {
          return expression(i)
        })
      ));

    return new SourceNode(createSignalOutput);
  }
}
