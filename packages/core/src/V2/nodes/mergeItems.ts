import { OperatorElementConfig } from '../circuitElement';
import { CreateOutputPort, ElementPorts } from './elementPorts';
import { Operator } from './operator';
import { every, filter, map, mergeMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ItemWithParams } from '../../ItemWithParams';

export const mergeItems: OperatorElementConfig = {
  boot: (params: unknown) => {
    const {
      requestor_key,
      supplier_key
    } = params as {
      requestor_key: string,
      supplier_key: string
    };

    let createMergeOutput: CreateOutputPort = (input) => {
      let requestors = input.getPort('requestors') as Observable<ItemWithParams[]>;
      let suppliers = input.getPort('suppliers') as Observable<ItemWithParams[]>;

      const isMatch = (r: ItemWithParams[], s: ItemWithParams[]): boolean => {
        return true;
      }

      const mergeObject = (r: unknown, s: unknown): unknown => Object.assign({}, r, s);

      const mergedPort = requestors.pipe(
        mergeMap(r => suppliers.pipe(
          filter(s => isMatch(r, s)),
          map(s => mergeObject(r, s)),
        ))
      );

      const notMergedPort = requestors.pipe(
        mergeMap(r => suppliers.pipe(
          filter(s => isMatch(r, s)),
          every(() => false),
          filter(x => x), // the same pattern of checking stream completion without any emission
          map(() => r)
        ))
      );

      return ElementPorts.fromPorts({
        merged: mergedPort,
        not_merged: notMergedPort
      });
    };
    return new Operator(createMergeOutput, 'merge');
  }
}
