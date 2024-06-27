import { OperatorElementConfig } from '../circuitElement';
import { delay } from 'rxjs/operators';
import { Operator } from './operator';
import { CreateOutputPort, ElementPorts } from './elementPorts';

export const sleep: OperatorElementConfig = {
  boot: (param: unknown) => {
    const duration = Number(param);
    let createSleepOutput: CreateOutputPort = (input) => new ElementPorts(input.getPort('input').pipe(delay(duration)));
    return new Operator(createSleepOutput);
  }
}
