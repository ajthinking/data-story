import { ItemValue } from './types/ItemValue';
import { ParamValue } from './Param';
import { evalMath } from './utils/evalMath';

export class ItemWithParams {
  type = 'ItemWithParams' as const
  value: ItemValue;
  params: Record<string, ParamValue>;

  constructor(value: ItemValue, params: Record<string, ParamValue>) {
    this.value = value;
    this.params = new Proxy({}, {
      get: (_, prop: string) => {
        const paramValue = params[prop];

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

const i1 = { i: 1 }