import { Param, StringableParam } from '../Param';
import { ItemValue } from '../types/ItemValue';
import { evalMath } from '../utils/evalMath';
import { get } from '../utils/get';
import HjsonParse from '../hjson/hjson-parse';
import { ParamsValueEvaluator } from '../types/ParamsValueEvaluator';
import { ParamEvaluator } from './ParamEvaluator';

export class StringableParamEvaluator implements ParamsValueEvaluator<StringableParam> {
  type = 'StringableParam' as const;

  evaluate(itemValue: ItemValue, param: StringableParam, globalParams: Param[]) {
    // **********************************************************************
    // VALIDATE
    // **********************************************************************

    // Ensure param is StringableParam
    if (param.type !== 'StringableParam') throw new Error(`Param "${param.name}" must be StringableParam`);

    let transformedValue: any  = String(param.value?.value);

    // **********************************************************************
    // INTERPOLATE GLOBAL PARAMS
    // **********************************************************************
    if (param.interpolate) {
      // Find any @{PARAM_NAME} and replace with the value of the global param
      const GLOBAL_PARAM_PATTERN = /@\{(\w+)\}/g;
      transformedValue = transformedValue.replace(GLOBAL_PARAM_PATTERN, (_: string, name: string) => {
        const param =  globalParams.find(p => p.name === name);
        if (!param) {
          console.error(`Global param "${name}" not found`);
          return '';
        }

        const paramEvaluator = new ParamEvaluator();
        return paramEvaluator.evaluate(itemValue, param as Param, []);
      });
    }

    // **********************************************************************
    // INTERPOLATE ITEM PROPERTIES
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
    const selectedEvaluation = {
      type: param.value?.['Evaluation'] as string,
    };

    if (selectedEvaluation?.type === 'JSON') {
      transformedValue = JSON.parse(transformedValue);
    }

    if (selectedEvaluation?.type === 'HJSON') {
      transformedValue = HjsonParse(transformedValue);
    }

    if (selectedEvaluation?.type === 'JS_FUNCTION') {
      const fn = eval(transformedValue);
      transformedValue = fn(itemValue);
    }

    if (selectedEvaluation?.type === 'JS_EXPRESSION') {
      try {
        // Wrap with parentheses to ensure brackets are not interpreted as a block
        const nonBlockExpression = `(${transformedValue})`;
        transformedValue = eval(nonBlockExpression);
      } catch(error) {
        console.log(`Failed to evaluate JS expression: ${transformedValue}`)
        throw error
      }
    }

    // **********************************************************************
    // CAST
    // **********************************************************************
    let selectedCast = {
      type: param.value?.['Cast'] as string,
    };

    if (selectedCast?.type === 'stringCast') {
      transformedValue = String(transformedValue);
    }

    if (selectedCast?.type === 'numberCast') {
      transformedValue = Number(transformedValue);
    }

    return transformedValue;
  }

  canEvaluate(param: Param): param is StringableParam {
    return param.type === this.type;
  }
}
