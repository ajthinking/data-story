import { Param, StringableParam, StringListParam } from '../Param';
import { ItemValue } from '../types/ItemValue';
import { ParamsValueEvaluator } from '../types/ParamsValueEvaluator';

export class StringListParamEvaluator implements ParamsValueEvaluator<StringListParam> {
  type = 'StringListParam' as const;

  evaluate(itemValue: ItemValue, param: StringListParam) {
    const value = param.value as string;
    // the value will be a string with comma or newline separated values
    const result = value.split('\n')
      .flatMap(line => line.split(','))
      .map(v => v.trim())
      .filter(v => v.length > 0);
    console.log('string list param result', result);
    return result;
  }

  canEvaluate(param: Param): param is StringListParam {
    return param.type === this.type;
  }
}