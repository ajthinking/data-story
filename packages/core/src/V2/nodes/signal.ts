import { SourceElementConfig, SourceElement } from '../circuitElement';
import { interval } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { CreateSourceOutputPort, Source } from './source';
import { ElementPorts } from './elementPorts';

interface SignalNodeParams {
  period?: number,
  count?: number,
  expression?: (i: number) => unknown
}

export const signal: SourceElementConfig = {
  boot: (param: unknown): SourceElement => {
    const signalNodeParams = param as SignalNodeParams;
    const period = Number(signalNodeParams?.period)
    const count = Number(signalNodeParams?.count)
    const expression = signalNodeParams?.expression ?? ((i: number) => {
      return { id: i + 1 }
    });
    const createSignalOutput: CreateSourceOutputPort = () => new ElementPorts(interval(period)
      .pipe(
        take(count),
        map((i) => {
          return expression(i)
        })
      ));

    return new Source(createSignalOutput, 'signal');
  }
}
