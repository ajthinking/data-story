import { ItemValue } from './types/ItemValue';
import { Param, ParamValue } from './Param';
import { evalMath } from './utils/evalMath';

export const isItemWithParams = (item: ItemWithParams | unknown): item is ItemWithParams => {
  // This does not always catch all cases
  if(item instanceof ItemWithParams) return true;
  
  if(
    item !== null
    && typeof item === 'object'
    && 'type' in item && item.type === 'ItemWithParams'
    && 'value' in item
    && 'params' in item
  ) return true;

  return false;
}

export class ItemWithParams {
  type = 'ItemWithParams' as const
  value: ItemValue;
  params: Record<string, ParamValue>;

  constructor(value: ItemValue, rawParams: Param[]) {
    this.value = value;
    this.params = new Proxy({}, {
      get: (_, key: string) => {
        const paramValue = rawParams.find(p => p.name === key)?.inputMode.value;

        // We can only use params that exist
        if (!paramValue) return undefined;

        // We can only interpolate strings params
        if (typeof paramValue !== 'string') return paramValue;

        // We can only use object properties when interpolating
        if (typeof this.value !== 'object') return paramValue;

        /** Replace template strings with item properties
        * Example: { greeting: "Hi ${name}!"}
        * Becomes: { greeting: "Hi Bob!"}
        * When the item value is { name: "Bob" }
        */
        let value = paramValue.replace(/\${(\w+)}/g, (_: string, name: string) => {
          return this.value[name];
        });

        /** Replaces function calls */
        value = value.replace(/@(\w+)\((.*)\)/g, (_: string, fn: string, expression: string) => {
          if(fn === 'evalMath') return String(evalMath(expression));

          // If we don't know the function, just return the expression
          return expression
        });

        return value;
      }
    });
  }
}