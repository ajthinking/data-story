import { NodeDescriptionFactory } from "./NodeDescriptionFactory";
import { Computer } from "./types/Computer";
import { ServiceProvider } from "./types/ServiceProvider";

export class Container {
  providers: ServiceProvider[] = []
  computers = new Map<string, Computer>()
  hooks = new Map<string, Function>()

  register(provider: ServiceProvider | ServiceProvider[]) {
    this.providers.push(
      ...(Array.isArray(provider) ? provider : [provider])
    )
  }

  boot() {
    this.providers.forEach(provider => {
      provider.register(this);
      provider.boot(this);
    });
  }

  addComputers(computers: Map<string, Computer>) {
    this.computers = new Map<string, Computer>(
      [...this.computers, ...computers]
    );
  }

  addHooks(hooks: Record<string, Function>) {
    this.hooks = new Map<string, Function>(
      [...this.hooks, ...Object.entries(hooks)]
    );
  }

  descriptions() {
    return Array.from(this.computers.values()).map(computer => {
      return NodeDescriptionFactory.fromComputer(computer)
    })  
  }
}