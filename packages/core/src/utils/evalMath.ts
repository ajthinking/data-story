export function evalMath(expression: string): number {
  // Remove whitespace
  expression = expression.replace(/\s+/g, '');

  // Ensure the expression only contains valid characters
  if (!/^[\d+\-*/\(\)\.\s]*$/.test(expression)) {
    throw new Error('Invalid characters in expression');
  }

  // Evaluate the expression
  let result: number;
  try {
    // https://esbuild.github.io/content-types/#direct-eval
    result = (0, eval)(expression);
  } catch (error: any) {
    throw new Error(`Error evaluating expression: ${error.message}`);
  }

  return result;
}
