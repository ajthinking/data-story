import { Diagram } from './Diagram';
import { ExecutionMemoryFactory } from './ExecutionMemoryFactory';
import { Executor } from './Executor';
import { InputObserverController } from './InputObserverController';
import { Registry } from './Registry';
import { UnfoldedDiagramFactory } from './UnfoldedDiagramFactory';
import { Storage } from './types/Storage';

export const ExecutorFactory = {
  create({
    diagram,
    registry,
    storage,
    inputObserverController
  }: {
    diagram: Diagram;
    registry: Registry;
    storage: Storage;
    inputObserverController?: InputObserverController;
  }) {
    const unfolded = UnfoldedDiagramFactory.create(diagram, registry.nestedNodes)

    const memory = new ExecutionMemoryFactory(
      unfolded.diagram,
      registry,
      storage,
      unfolded.unfoldedGlobalParams,
      inputObserverController
    ).create()

    return new Executor({
      diagram: unfolded.diagram,
      registry,
      storage,
      memory
    });
  }
}
