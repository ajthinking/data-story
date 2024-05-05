import { Diagram } from './Diagram';
import { Executor } from './Executor';
import { UnfoldedDiagramFactory } from './UnfoldedDiagramFactory';
import { Computer } from './types/Computer';
import { Storage } from './types/Storage';

export const ExecutorFactory = {
  create(
    diagram: Diagram,
    computers: Record<string, Computer>,
    storage: Storage
  ) {
    const unfolded = UnfoldedDiagramFactory.create(diagram, {})

    return new Executor(unfolded.diagram, computers, storage);
  }
}