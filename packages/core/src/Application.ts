import { ComputerFactory } from './ComputerFactory';
import { Diagram } from './Diagram';
import { NodeDescriptionFactory } from './NodeDescriptionFactory';
import { Computer } from './types/Computer';
import { ComputerConfig } from './types/ComputerConfig';
import { ServiceProvider } from './types/ServiceProvider';

export class Application {
  providers: ServiceProvider[] = [];
  computers: Record<string, Computer> = {};
  nestedNodes: Record<string, Diagram> = {};
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
      this.computers[computer.name] = computer;
    }
  }

  addNestedNode(name: string, diagram: Diagram) {
    this.nestedNodes[name] = diagram;
  }

  addHooks(hooks: Record<string, Function>) {
    this.hooks = new Map<string, Function>(
      [...this.hooks, ...Object.entries(hooks)]
    );
  }

  descriptions() {
    const fromComputers = Object.values(this.computers).map(computer => {
      return NodeDescriptionFactory.fromComputer(computer);
    });

    const fromNestedNodes = Object.entries(this.nestedNodes).map(([name, diagram]) => {
      return NodeDescriptionFactory.fromDiagram(name, diagram);
    });

    return [
      ...fromComputers,
      ...fromNestedNodes
    ];
  }
}
