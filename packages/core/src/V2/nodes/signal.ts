import { ISourceNode, ISourceNodeConfig, PortProvider } from '../Node';
import { interval } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { NodePorts } from './sleep';

type CreateSourceOutputPort = () => PortProvider;

export class Source implements ISourceNode {

  nodeType = 'source' as const;

  constructor(private createOutputPort: CreateSourceOutputPort) {
  }

  getOutput(): PortProvider {
    return this.createOutputPort();
  }

}

interface SignalNodeParams {
  period?: number,
  count?: number,
  expression?: (i: number) => unknown
}

export const Signal: ISourceNodeConfig = {
  boot: (param: unknown): ISourceNode => {
    const signalNodeParams = param as SignalNodeParams;
    const period = Number(signalNodeParams?.period)
    const count = Number(signalNodeParams?.count)
    const expression = signalNodeParams?.expression ?? ((i: number) => {
      return { id: i + 1 }
    });
    const createSignalOutput: CreateSourceOutputPort = () => new NodePorts(interval(period)
      .pipe(
        take(count),
        map((i) => {
          return expression(i)
        })
      ));

    return new Source(createSignalOutput);
  }
}
