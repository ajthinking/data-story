// inputvalue === outputvalue
// show the value pass numbe r of links

import { CreateOutputPort, ElementPorts } from './elementPorts';
import { map, tap } from 'rxjs/operators';
import { OperatorElementConfig } from '../circuitElement';
import { Operator } from './operator';

export const linkCount: OperatorElementConfig = {
  boot: (param: unknown) => {
    const linkCountParams = param as { getLinkCount: (count: number) => void };
    const createLinkCountOutput: CreateOutputPort = (input) => {
      return new ElementPorts(input.getPort('input').pipe(
        map((val, i) => {
          linkCountParams.getLinkCount(i + 1);
          return val;
        })
      ))
    }
    return new Operator(createLinkCountOutput);
  }
}
