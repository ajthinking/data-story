import { ISourceNodeConfig, SourceNode } from '../Node';
import { interval } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { CreateSourceOutputPort, Source } from './source';
import { NodePorts } from './nodePorts';

interface SignalNodeParams {
  period?: number,
  count?: number,
  expression?: (i: number) => unknown
}

export const Signal: ISourceNodeConfig = {
  boot: (param: unknown): SourceNode => {
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
