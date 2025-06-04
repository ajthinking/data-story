import { Param } from '../Param';
import { ItemValue } from '../types/ItemValue';
import { StringableParamEvaluator } from './StringableParamEvaluator';
import { ParamsValueEvaluator } from '../types/ParamsValueEvaluator';

export class ParamEvaluator implements ParamsValueEvaluator<any>{
  private evaluators: ParamsValueEvaluator<Param>[] = [
    new StringableParamEvaluator(),
  ]

  canEvaluate(param: Param): param is Param {
    return this.evaluators.some(e => e.canEvaluate(param));
  }

  evaluate(itemValue: ItemValue, param: Param, globalParams: Param[]): any {
    const evaluator = this.evaluators.find(e => e.canEvaluate(param));
    if(!evaluator) return param.input;

    return evaluator.evaluate(itemValue, param, globalParams);
  }
}
