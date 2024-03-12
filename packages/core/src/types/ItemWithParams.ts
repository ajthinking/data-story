import { Param } from '../Param';
import { ItemValue } from './ItemValue';

export interface ParamsValueEvaluator<TParams extends Param> {
  canEvaluate: (param: Param) => param is TParams;
  evaluate(itemValue: ItemValue, param: TParams): any;
}
