import { describe, expect, it } from 'vitest';
import { withNodeExecutionErrorHandling } from './withNodeExecutionErrorHandling';
import { NodeExecutionError } from '../types/Errors';

describe('withNodeExecutionErrorHandling', () => {
  const mockNode = {
    id: 'test-node-1',
    label: 'Test Node',
    type: 'TestComputer',
  };

  it('should yield values normally when no error occurs', async () => {
    const mockAsyncGenerator = async function* () {
      yield 'value1';
      yield 'value2';
      return 'final';
    };

    const wrappedGenerator = withNodeExecutionErrorHandling(mockAsyncGenerator, mockNode);
    const generator = wrappedGenerator();

    const result1 = await generator.next();
    expect(result1.value).toBe('value1');
    expect(result1.done).toBe(false);

    const result2 = await generator.next();
    expect(result2.value).toBe('value2');
    expect(result2.done).toBe(false);

    const result3 = await generator.next();
    expect(result3.value).toBe('final');
    expect(result3.done).toBe(true);
  });

  it('should wrap errors with NodeExecutionError', async () => {
    const errorMessage = 'Something went wrong';
    const mockAsyncGenerator = async function* () {
      yield 'value1';
      throw new Error(errorMessage);
    };

    const wrappedGenerator = withNodeExecutionErrorHandling(mockAsyncGenerator, mockNode);
    const generator = wrappedGenerator();

    const result1 = await generator.next();
    expect(result1.value).toBe('value1');

    await expect(generator.next()).rejects.toThrow(NodeExecutionError);

    try {
      await generator.next();
    } catch (error) {
      expect(error).toBeInstanceOf(NodeExecutionError);
      expect((error as NodeExecutionError).node).toEqual(mockNode);
      expect((error as NodeExecutionError).message).toContain(errorMessage);
      expect((error as NodeExecutionError).message).toContain(mockNode.label);
      expect((error as NodeExecutionError).message).toContain(mockNode.type);
    }
  });

  it('should handle non-Error objects thrown', async () => {
    const mockAsyncGenerator = async function* () {
      throw 'string error';
    };

    const wrappedGenerator = withNodeExecutionErrorHandling(mockAsyncGenerator, mockNode);
    const generator = wrappedGenerator();

    await expect(generator.next()).rejects.toThrow(NodeExecutionError);

    try {
      await generator.next();
    } catch (error) {
      expect(error).toBeInstanceOf(NodeExecutionError);
      expect((error as NodeExecutionError).message).toContain('string error');
    }
  });

  it('should pass arguments correctly to the wrapped function', async () => {
    const mockAsyncGenerator = async function* (arg1: string, arg2: number) {
      yield `${arg1}-${arg2}`;
    };

    const wrappedGenerator = withNodeExecutionErrorHandling(mockAsyncGenerator, mockNode);
    const generator = wrappedGenerator('test', 42);

    const result = await generator.next();
    expect(result.value).toBe('test-42');
  });
});
