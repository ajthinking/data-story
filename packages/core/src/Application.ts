import { Diagram } from './Diagram';
import { DiagramBuilder } from './DiagramBuilder';
import { ExecutorFactory } from './ExecutorFactory';
import { ObserverController } from './ObserverController';
import { NodeDescriptionFactory } from './NodeDescriptionFactory';
import { Registry } from './Registry';
import { Computer } from './types/Computer';
import { ServiceProvider } from './types/ServiceProvider';

export class Application {
  hasBooted = false;

  providers: ServiceProvider[] = [];
  hooks = new Map<string, Function>();
  private registry = new Registry({}, {});

  register(provider: ServiceProvider | ServiceProvider[]) {
    this.providers.push(
      ...(Array.isArray(provider) ? provider : [provider]),
    );

    return this;
  }

  async boot() {
    for(const provider of this.providers) {
      await provider.boot(this)
    }

    this.providers.forEach(provider => {
      provider.boot(this);
    });

    this.hasBooted = true;

    return this;
  }

  addComputers(computers: Computer[]) {
    for (const computer of computers) {
      this.registry.computers[computer.type] = computer;
    }
  }

  addNestedNode(type: string, diagram: Diagram) {
    this.registry.nestedNodes[type] = diagram;
  }

  descriptions() {
    const fromComputers = Object.values(this.registry.computers).map(computer => {
      return NodeDescriptionFactory.fromComputer(computer);
    });

    const fromNestedNodes = Object.entries(this.registry.nestedNodes).map(([name, diagram]) => {
      return NodeDescriptionFactory.fromDiagram(name, diagram);
    });

    return [
      ...fromComputers,
      ...fromNestedNodes,
    ];
  }

  getDiagramBuilder() {
    return new DiagramBuilder(
      this.descriptions(),
    );
  }

  getExecutor({ diagram, observerController }: {
    diagram: Diagram;
    observerController?: ObserverController;
  }) {
    return ExecutorFactory.create({
      diagram,
      registry: this.registry,
      observerController,
    })
  }

  getRegistry() {
    return this.registry;
  }
}

export type BootedApplication = Application & {
  hasBooted: true;
}
