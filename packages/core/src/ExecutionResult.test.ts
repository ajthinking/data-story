import { describe, expect, it } from 'vitest'
import { ExecutionResult } from './ExecutionResult'

describe('stringify', () => {
  it('should stringify', () => {
    const result = new ExecutionResult('id')
    const stringified = JSON.stringify(result)
    const reparsed = JSON.parse(stringified)

    expect(reparsed).toMatchObject(result)
  })
})