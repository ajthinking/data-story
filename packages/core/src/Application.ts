import { Diagram } from './Diagram';
import { DiagramBuilder } from './DiagramBuilder';
import { DiagramBuilderV3 } from './DiagramBuilderV3';
import { ExecutorFactory } from './ExecutorFactory';
import { InputObserverController, InputObserverController1 } from './InputObserverController';
import { NodeDescriptionFactory } from './NodeDescriptionFactory';
import { Registry } from './Registry';
import { Computer } from './types/Computer';
import { ServiceProvider } from './types/ServiceProvider';
import { Storage } from './types/Storage';

export class Application {
  hasBooted = false;

  providers: ServiceProvider[] = [];
  hooks = new Map<string, Function>();
  private registry = new Registry({}, {});

  register(provider: ServiceProvider | ServiceProvider[]) {
    this.providers.push(
      ...(Array.isArray(provider) ? provider : [provider])
    );

    return this;
  }

  async boot() {
    this.providers.forEach(provider => {
      provider.boot(this);
    });

    const mockDelayPromise = new Promise<number>((resolve) => {
      setTimeout(() => {
        resolve(1);
      }, 100);
    });

    await mockDelayPromise;

    this.hasBooted = true;

    return this;
  }

  addComputers(computers: Computer[]) {
    for (const computer of computers) {
      this.registry.computers[computer.name] = computer;
    }
  }

  addNestedNode(name: string, diagram: Diagram) {
    this.registry.nestedNodes[name] = diagram;
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
      ...fromNestedNodes
    ];
  }

  getDiagramBuilder() {
    return new DiagramBuilder();
  }

  getDiagramBuilderV3() {
    return new DiagramBuilderV3(
      Object.values(this.registry.computers)
    );
  }

  getExecutor({ diagram, storage, inputObserverController, inputObserverControllerMock}: {
    diagram: Diagram;
    storage: Storage;
    inputObserverController?: InputObserverController;
    inputObserverControllerMock?: InputObserverController1;
  }) {
    return ExecutorFactory.create({
      diagram,
      registry: this.registry,
      storage,
      inputObserverController,
      inputObserverControllerMock
    })
  }

  getRegistry() {
    return this.registry;
  }
}

export type BootedApplication = Application & {
  hasBooted: true;
}
