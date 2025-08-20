import { NodeExecutionError } from '../types/Errors';
import { Node } from '../types/Node';

/**
 * High-order helper function that wraps an async generator function
 * and rethrows any error thrown by the run function wrapped with NodeExecutionError
 *
 * @param runFn - The async generator function to wrap
 * @param node - The node context for error reporting
 * @returns A wrapped async generator that handles errors
 */
export function withNodeExecutionErrorHandling<TArgs extends any[], TYield, TReturn, TNext>(
  runFn: (...args: TArgs) => AsyncGenerator<TYield, TReturn, TNext>,
  node: Pick<Node, 'id' | 'label' | 'type'>,
) {
  return async function* (...args: TArgs): AsyncGenerator<TYield, TReturn, TNext> {
    try {
      return yield* runFn(...args);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      throw new NodeExecutionError(errorMessage, node);
    }
  };
}
