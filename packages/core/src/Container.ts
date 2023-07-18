import { Computer } from "./types/Computer";
import { ServiceProvider } from "./types/ServiceProvider";

export class Container {
  providers: ServiceProvider[] = []
  computers = new Map<string, Computer>()

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
}