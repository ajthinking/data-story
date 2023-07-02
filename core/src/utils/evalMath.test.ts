import { evalMath } from "./evalMath"

it('returns the result of an expression', () => {
  const expression = '1.0+2-3*4/5'

  expect(evalMath(expression)).toBeCloseTo(0.6)
})

it('throws an error if the expression contains invalid characters', () => {
  const expression = '1+2-3*4/5a'

  expect(() => evalMath(expression)).toThrow('Invalid characters in expression')
})

it('throws an error if the expression is invalid', () => {
  const expression = '1+++2'

  expect(() => evalMath(expression)).toThrow(
    'Error evaluating expression: Invalid left-hand side expression in postfix operation'
  )
})