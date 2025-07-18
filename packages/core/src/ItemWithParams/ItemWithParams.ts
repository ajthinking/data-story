import { ItemValue } from '../types/ItemValue';
import { Param, EvaluatedParamValue } from '../Param';
import { ParamEvaluator } from './ParamEvaluator';

export const isItemWithParams = (item: ItemWithParams | unknown): item is ItemWithParams => {
  // This does not always catch all cases
  if(item instanceof ItemWithParams) return true;

  if(
    item !== null
    && typeof item === 'object'
    // @ts-ignore
    && 'type' in item && item.type === 'ItemWithParams'
    && 'value' in item
    && 'params' in item
  ) return true;

  return false;
}

export class ItemWithParams<ExpectedType extends ItemValue = ItemValue> {
  type = 'ItemWithParams' as const
  value: ExpectedType;
  params: Record<string, EvaluatedParamValue>;

  constructor(
    value: ExpectedType,
    rawParams: Param[],
    globalParams: Param[],
  ) {
    this.value = value;
    this.params = new Proxy({}, {
      get: (_, key: string) => {
        const param = rawParams.find(p => p.name === key);
        if (!param) throw new Error(`Param "${key}" does not exist`);

        try {
          const paramEvaluatorInstance = new ParamEvaluator();
          return paramEvaluatorInstance.evaluate(value, param, globalParams);
        } catch (error) {
          console.error('error', error);
          return param.input;
        }
      },
    });
  }
}