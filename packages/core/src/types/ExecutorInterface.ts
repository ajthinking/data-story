import { ExecutionUpdate } from '../types/ExecutionUpdate';

export interface ExecutorInterface {
  execute(): AsyncGenerator<ExecutionUpdate, void, unknown>;
}