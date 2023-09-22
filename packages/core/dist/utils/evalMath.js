"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.evalMath = void 0;
function evalMath(expression) {
    // Remove whitespace
    expression = expression.replace(/\s+/g, "");
    // Ensure the expression only contains valid characters
    if (!/^[\d+\-*/\(\)\.\s]*$/.test(expression)) {
        throw new Error('Invalid characters in expression');
    }
    // Evaluate the expression
    let result;
    try {
        result = eval(expression);
    }
    catch (error) {
        throw new Error('Error evaluating expression: ' + error.message);
    }
    return result;
}
exports.evalMath = evalMath;
