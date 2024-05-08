import { Executor } from './Executor';
import { UnfoldedDiagramFactory } from './UnfoldedDiagramFactory';
import { ExecutionMemoryFactoryParams } from './types/ExecutionFactoryParams';

export const ExecutorFactory = {
  create({
    diagram,
    registry,
    storage,
    inputObserverController
  }:ExecutionMemoryFactoryParams) {
    const unfolded = UnfoldedDiagramFactory.create(diagram, registry.nestedNodes)

    return new Executor({
      diagram: unfolded.diagram,
      registry,
      storage,
      inputObserverController
    });
  }
}
