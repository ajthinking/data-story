import { Container } from "./Container";
import { ComputerRegistry } from "./computerRegistry";
import { ServiceProvider } from "./types/ServiceProvider";

export const coreNodeProvider: ServiceProvider = {
  register: (container: Container) => {
    const all = ComputerRegistry.all()
    container.addComputers(all)
  },
  
  boot: (container: Container) => {}
}