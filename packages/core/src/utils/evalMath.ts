export function evalMath(expression: string): number {
  // Remove whitespace
  expression = expression.replace(/\s+/g, "");

  // Ensure the expression only contains valid characters
  if (!/^[\d+\-*/\(\)\.\s]*$/.test(expression)) {
      throw new Error('Invalid characters in expression');
  }

  // Evaluate the expression
  let result: number;
  try {
      result = eval(expression);
  } catch (error: any) {
      throw new Error('Error evaluating expression: ' + error.message);
  }

  return result;
}