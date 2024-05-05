import { Diagram } from './Diagram';
import { Executor } from './Executor';
import { Computer } from './types/Computer';
import { Storage } from './types/Storage';

export const ExecutorFactory = {
  create(
    diagram: Diagram,
    computers: Record<string, Computer>,
    storage: Storage
  ) {
    return new Executor(diagram, computers, storage);
  }
}