import { Diagram } from './Diagram';
import { ExecutionMemoryFactory } from './ExecutionMemoryFactory';
import { Executor } from './Executor';
import { InputObserverController } from './InputObserverController';
import { Registry } from './Registry';
import { UnfoldedDiagramFactory } from './UnfoldedDiagramFactory';

export const ExecutorFactory = {
  create({
    diagram,
    registry,
    inputObserverController,
  }: {
    diagram: Diagram;
    registry: Registry;
    inputObserverController?: InputObserverController;
  }) {
    const unfolded = UnfoldedDiagramFactory.create(
      diagram,
      registry.nestedNodes,
    )

    const memory = new ExecutionMemoryFactory(
      unfolded,
      registry,
      inputObserverController,
    ).create()

    return new Executor({
      diagram: unfolded.diagram,
      registry,
      memory,
    });
  },
}
