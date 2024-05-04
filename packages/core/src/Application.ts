import { ComputerFactory } from './ComputerFactory';
import { NodeDescriptionFactory } from './NodeDescriptionFactory';
import { Computer } from './types/Computer';
import { ComputerConfig } from './types/ComputerConfig';
import { ServiceProvider } from './types/ServiceProvider';

export class Application {
  providers: ServiceProvider[] = [];
  computers = new Map<string, Computer>();
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
    const newComputers = new Map(computerConfigs.map(config => {
      const computer = new ComputerFactory().get(config);
      return [computer.name, computer];
    }));

    this.computers = new Map([...this.computers, ...newComputers]);
  }

  addComputers(computers: Map<string, Computer>) {
    this.computers = new Map([...this.computers, ...computers]);
  }

  addHooks(hooks: Record<string, Function>) {
    this.hooks = new Map<string, Function>(
      [...this.hooks, ...Object.entries(hooks)]
    );
  }

  descriptions() {
    return Array.from(this.computers.values()).map(computer => {
      return NodeDescriptionFactory.fromComputer(computer);
    });
  }
}
