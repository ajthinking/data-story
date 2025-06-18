import { Diagram } from './Diagram';
import { ExecutionMemoryFactory } from './ExecutionMemoryFactory';
import { Executor } from './Executor';
import { ObserverController } from './ObserverController';
import { Registry } from './Registry';
import { ExecutableDiagramFactory } from './ExecutableDiagramFactory';

export const ExecutorFactory = {
  create({
    diagram,
    registry,
    observerController,
  }: {
    diagram: Diagram;
    registry: Registry;
    observerController?: ObserverController;
  }) {
    const unfolded = ExecutableDiagramFactory.create(
      diagram,
      registry.nestedNodes,
    )

    const memory = new ExecutionMemoryFactory(
      unfolded,
      registry,
      observerController,
    ).create()

    return new Executor({
      diagram: unfolded.diagram,
      registry,
      memory,
    });
  },
}
