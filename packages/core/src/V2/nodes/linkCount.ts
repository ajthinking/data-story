// inputvalue === outputvalue
// show the value pass numbe r of links

import { CreateOutputPort, NodePorts } from './nodePorts';
import { map, tap } from 'rxjs/operators';
import { OperatorNodeOperatorConfig } from '../Node';
import { Operator } from './operator';

export const LinkCount: OperatorNodeOperatorConfig = {
  boot: (param: unknown) => {
    const linkCountParams = param as { getLinkCount: (count: number) => void };
    const createLinkCountOutput: CreateOutputPort = (input) => {
      return new NodePorts(input.getPort('input').pipe(
        map((val, i) => {
          linkCountParams.getLinkCount(i + 1);
          return val;
        })
      ))
    }
    return new Operator(createLinkCountOutput);
  }
}
