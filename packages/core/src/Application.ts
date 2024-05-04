import { ComputerFactory } from './ComputerFactory';
import { NodeDescriptionFactory } from './NodeDescriptionFactory';
import { Computer } from './types/Computer';
import { ComputerConfig } from './types/ComputerConfig';
import { ServiceProvider } from './types/ServiceProvider';

export class Application {
  providers: ServiceProvider[] = [];
  computers: Record<string, Computer> = {};
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

  addHooks(hooks: Record<string, Function>) {
    this.hooks = new Map<string, Function>(
      [...this.hooks, ...Object.entries(hooks)]
    );
  }

  descriptions() {
    return Object.values(this.computers).map(computer => {
      return NodeDescriptionFactory.fromComputer(computer);
    });
  }
}
