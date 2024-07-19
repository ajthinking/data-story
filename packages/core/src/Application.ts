import { ComputerFactory } from './ComputerFactory';
import { Diagram } from './Diagram';
import { DiagramBuilder } from './DiagramBuilder';
import { DiagramBuilderV3 } from './DiagramBuilderV3';
import { NodeDescriptionFactory } from './NodeDescriptionFactory';
import { Registry } from './Registry';
import { Computer } from './types/Computer';
import { ServiceProvider } from './types/ServiceProvider';

export class Application {
  providers: ServiceProvider[] = [];
  hooks = new Map<string, Function>();
  private registry = new Registry({}, {});

  register(provider: ServiceProvider | ServiceProvider[]) {
    this.providers.push(
      ...(Array.isArray(provider) ? provider : [provider])
    );

    return this;
  }

  boot() {
    this.providers.forEach(provider => {
      provider.register(this);
      provider.boot(this);
    });

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

  getRegistry() {
    return this.registry;
  }
}
