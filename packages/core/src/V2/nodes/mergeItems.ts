import { OperatorElementConfig } from '../circuitElement';
import { CreateOutputPort, ElementPorts } from './elementPorts';
import { Operator } from './operator';
import { map, filter, mergeMap, every } from 'rxjs/operators';

export const mergeItems: OperatorElementConfig = {
  boot: () => {
    function isMatch(r: unknown, s: unknown): boolean {
      return true;
    }

    function mergeObject(r: unknown, s: unknown): unknown{
      return Object.assign({}, r, s);
    }

    let createMergeOutput: CreateOutputPort = (input) => {
      let requestors = input.getPort('requestors');
      let suppliers = input.getPort('suppliers');

      const merged_port = requestors.pipe(
        mergeMap(r => suppliers.pipe(
          filter(s => isMatch(r, s)),
          map(s => mergeObject(r, s)),
        ))
      );

      const not_merged_port = requestors.pipe(
        mergeMap(r => suppliers.pipe(
          filter(s => isMatch(r, s)),
          every(() => false),
          filter(x => x), // the same pattern of checking stream completion without any emission
          map(() => r)
        ))
      );

      return ElementPorts.fromPorts({
        merged: merged_port,
        not_merged: not_merged_port
      });
    };
    return new Operator(createMergeOutput, 'merge');
  }
}
