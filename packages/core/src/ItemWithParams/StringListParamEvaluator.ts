import { Param, StringableParam, StringListParam } from '../Param';
import { ItemValue } from '../types/ItemValue';
import { ParamsValueEvaluator } from '../types/ParamsValueEvaluator';

export class StringListParamEvaluator implements ParamsValueEvaluator<StringListParam> {
  type = 'StringListParam' as const;

  evaluate(itemValue: ItemValue, param: StringListParam) {
    const value = param.value as string;
    const result = value.split(',').map(v => v.trim().toString()).filter(v => v.length > 0);
    return result;
  }

  canEvaluate(param: Param): param is StringListParam {
    return param.type === this.type;
  }
}