import { ComputerFactory } from './ComputerFactory';
import { Diagram } from './Diagram';
import { NodeDescriptionFactory } from './NodeDescriptionFactory';
import { Registry } from './Registry';
import { ComputerConfig } from './types/ComputerConfig';
import { ServiceProvider } from './types/ServiceProvider';

export class Application {
  providers: ServiceProvider[] = [];
  registry = new Registry({}, {});
  hooks = new Map<string, Function>();

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

  addComputerConfigs(computerConfigs: ComputerConfig[]) {
    for (const config of computerConfigs) {
      const computer = new ComputerFactory().get(config);
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
}
