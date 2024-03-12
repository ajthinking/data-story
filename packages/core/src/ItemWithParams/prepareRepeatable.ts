import { Param, RepeatableParam, StringableParam } from '../Param';
import { ItemValue } from '../types/ItemValue';
import { ParamsValueEvaluator } from '../types/ItemWithParams';

export class RepeatableParamEvaluator implements ParamsValueEvaluator<RepeatableParam<any>> {
  constructor(private evaluator: ParamsValueEvaluator<any>) {
  }
  evaluate(itemValue: ItemValue, param: RepeatableParam<any>) {
    return Object.fromEntries(param.row.map((row: {name: string}) =>
      [row.name, this.evaluator.evaluate(itemValue, row)] as const));
  }
  type = 'RepeatableParam' as const;
  canEvaluate = (param: Param): param is RepeatableParam<any> => param.type === this.type;
}

export const prepareRepeatable = (itemValue: ItemValue, param: Param) => {
  // TODO
}
