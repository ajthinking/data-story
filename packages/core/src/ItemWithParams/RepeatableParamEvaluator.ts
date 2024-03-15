import { Param, RepeatableParam } from '../Param';
import { ItemValue } from '../types/ItemValue';
import { ParamsValueEvaluator } from '../types/ParamsValueEvaluator';

export class RepeatableParamEvaluator implements ParamsValueEvaluator<RepeatableParam<any>> {

  type = 'RepeatableParam' as const;

  constructor(private evaluator: ParamsValueEvaluator<any>) {
  }

  evaluate(itemValue: ItemValue, param: RepeatableParam<any>) {
    return Object.fromEntries(param.row.map((row: {name: string}) => {
      return [row.name, this.evaluator.evaluate(itemValue, row)] as const;
    }));
  }

  canEvaluate(param: Param): param is RepeatableParam<any> {
    return param.type === this.type;
  }
}
