import { Param, StringableParam, StringListParam } from '../Param';
import { ItemValue } from '../types/ItemValue';
import { ParamsValueEvaluator } from '../types/ParamsValueEvaluator';
import { parseStringList } from '../utils/parseStringList';

export class StringListParamEvaluator implements ParamsValueEvaluator<StringListParam> {
  type = 'StringListParam' as const;

  evaluate(itemValue: ItemValue, param: StringListParam) {
    return parseStringList(itemValue.value)
  }

  canEvaluate(param: Param): param is StringListParam {
    return param.type === this.type;
  }
}