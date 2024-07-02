import { CreateOutputPort, ElementPorts } from './elementPorts';
import { map } from 'rxjs/operators';
import { OperatorElementConfig, PortProvider } from '../circuitElement';
import { Operator } from './operator';
import { Observable } from 'rxjs';

export const linkCount: OperatorElementConfig = {
  boot: (param: unknown) => {
    const linkCountParams = param as {getLinkCount: (count: number) => void};

    const getObservable = (input: PortProvider): Observable<unknown> => input.getPort('pipe').pipe(
      map((val, i) => {
        linkCountParams.getLinkCount(i + 1);
        return val;
      })
    );
    const createLinkCountOutput: CreateOutputPort = (input) => {
      return ElementPorts.fromPorts({
        pipe: getObservable(input)
      });
    }

    return new Operator(createLinkCountOutput, 'linkCount');
  }
}
