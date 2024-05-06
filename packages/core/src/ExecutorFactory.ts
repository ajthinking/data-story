import { Diagram } from './Diagram';
import { Executor } from './Executor';
import { Registry } from './Registry';
import { UnfoldedDiagramFactory } from './UnfoldedDiagramFactory';
import { Computer } from './types/Computer';
import { Storage } from './types/Storage';
import { InputObserverController } from './InputObserverController';

export const ExecutorFactory = {
  create(
    diagram: Diagram,
    registry: Registry,
    storage: Storage,
    inputObserverController?: InputObserverController,
  ) {
    const unfolded = UnfoldedDiagramFactory.create(diagram, registry.nestedNodes)

    return new Executor(unfolded.diagram, registry, storage, inputObserverController);
  }
}
