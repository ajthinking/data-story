import { Param, StringableParam } from '../Param';
import { ItemValue } from '../types/ItemValue';
import { evalMath } from '../utils/evalMath';
import { get } from '../utils/get';
import Hjson from '@data-story/hjson';
import { ParamsValueEvaluator } from '../types/ParamsValueEvaluator';

export class StringableParamEvaluator implements ParamsValueEvaluator<StringableParam> {
  type = 'StringableParam' as const;

  evaluate(itemValue: ItemValue, param: StringableParam) {
    return prepareStringable(itemValue, param);
  }

  canEvaluate(param: Param): param is StringableParam {
    return param.type === this.type;
  }
}
export const prepareStringable = (itemValue: ItemValue, param: Param) => {
  // **********************************************************************
  // VALIDATE
  // **********************************************************************

  // Ensure param is StringableParam
  if (param.type !== 'StringableParam') throw new Error(`Param "${param.name}" must be StringableParam`);

  let transformedValue: string | any = String(param.value);

  // **********************************************************************
  // INTERPOLATE
  // **********************************************************************
  if (param.interpolate) {
    /** Replace template strings with item properties
     * Example: { greeting: "Hi ${name}!"}
     * Becomes: { greeting: "Hi Bob!"}
     * When the item value is { name: "Bob" }
     */
    transformedValue = transformedValue.replace(
      /\${([\w\.]+)}/g,
      (_: string, name: string) => get(itemValue, name)
    );
  }

  // **********************************************************************
  // FUNCTIONS
  // **********************************************************************
  // TODO option for this
  if (true) {
    /** Replaces function calls */
    transformedValue = transformedValue.replace(/@(\w+)\((.*)\)/g, (_: string, fn: string, expression: string) => {
      const args = expression.split(',').map(arg => arg.trim());

      const functions: Record<string, Function> = {
        evalMath: (expression: string) => evalMath(expression),
        env: (expression: string) => {
          if (typeof process === 'undefined') throw new Error('env() is not available in the browser');

          return process.env[args[0]];
        },
        number: (expression: string) => Number(expression),
        string: (expression: string) => String(expression),
      }

      const match = functions[fn];

      // If we don't know the function, just return the expression
      if (!match) return expression;

      return match(...args);
    });
  }

  // **********************************************************************
  // EVALUATE
  // **********************************************************************
  const evaluations = param.evaluations || [];
  const selectedEvaluation = evaluations.find(e => e.selected);

  if (selectedEvaluation?.type === 'JSON') {
    transformedValue = JSON.parse(transformedValue);
  }

  if (selectedEvaluation?.type === 'HJSON') {
    transformedValue = Hjson.parse(transformedValue);
  }

  if (selectedEvaluation?.type === 'JS') {
    const fn = eval(transformedValue);
    transformedValue = fn(itemValue);
  }

  // **********************************************************************
  // CAST
  // **********************************************************************
  const casts = param.casts || [];
  const selectedCast = casts.find(c => c.selected);

  if (selectedCast?.type === 'String') {
    transformedValue = String(transformedValue);
  }

  if (selectedCast?.type === 'Number') {
    transformedValue = Number(transformedValue);
  }

  return transformedValue;
}
