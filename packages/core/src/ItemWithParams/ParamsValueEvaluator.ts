import { Param } from '../Param';
import { ItemValue } from '../types/ItemValue';
import { StringableParamEvaluator } from './prepareStringable';
import { ParamsValueEvaluator } from '../types/ItemWithParams';
import { RepeatableParamEvaluator } from './prepareRepeatable';

export class ParamEvaluator implements ParamsValueEvaluator<any>{
  private evaluators: ParamsValueEvaluator<Param>[] = [
    new StringableParamEvaluator(),
    new RepeatableParamEvaluator(this),
  ]

  canEvaluate(param: Param): param is Param {
    return this.evaluators.some(e => e.canEvaluate(param));
  }
  evaluate(itemValue: ItemValue, param: Param) {
    const evaluator = this.evaluators.find(e => e.canEvaluate(param));
    if(!evaluator) throw new Error(`No evaluator for param type "${param.type}"`);

    return evaluator.evaluate(itemValue, param);
  }
}
