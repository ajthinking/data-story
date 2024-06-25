import { OperatorNodeOperatorConfig } from '../Node';
import { delay } from 'rxjs/operators';
import { Operator } from './operator';
import { CreateOutputPort, NodePorts } from './nodePorts';

export const Sleep: OperatorNodeOperatorConfig = {
  boot: (param: unknown) => {
    const duration = Number(param);
    let createSleepOutput: CreateOutputPort = (input) => new NodePorts(input.getPort('input').pipe(delay(duration)));
    return new Operator(createSleepOutput);
  }
}
