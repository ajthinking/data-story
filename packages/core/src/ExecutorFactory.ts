import { Diagram } from './Diagram';
import { ExecutionMemoryFactory } from './ExecutionMemoryFactory';
import { Executor } from './Executor';
import {
  InputObserverController,
  InputObserverController1,
} from './InputObserverController';
import { Registry } from './Registry';
import { UnfoldedDiagramFactory } from './UnfoldedDiagramFactory';
import { Storage } from './types/Storage';

export const ExecutorFactory = {
  create({
    diagram,
    registry,
    storage,
    inputObserverController,
    inputObserverControllerMock
  }: {
    diagram: Diagram;
    registry: Registry;
    storage: Storage;
    inputObserverController?: InputObserverController;
    inputObserverControllerMock?: InputObserverController1;
  }) {
    const unfolded = UnfoldedDiagramFactory.create(
      diagram,
      registry.nestedNodes
    )

    const memory = new ExecutionMemoryFactory(
      unfolded,
      registry,
      storage,
      inputObserverController,
      inputObserverControllerMock
    ).create()

    return new Executor({
      diagram: unfolded.diagram,
      registry,
      storage,
      memory
    });
  }
}
