import { Param, SelectParam, StringableParam } from '../Param';
import { ItemValue } from '../types/ItemValue';
import { ParamsValueEvaluator } from '../types/ParamsValueEvaluator';

export class SelectableParamEvaluator implements ParamsValueEvaluator<SelectParam> {
  type = 'SelectParam' as const;

  evaluate(itemValue: ItemValue, param: SelectParam) {
    // TODO this implementation assumes selects are always static and strings
    return param.value;
  }

  canEvaluate(param: Param): param is SelectParam {
    return param.type === this.type;
  }
}
