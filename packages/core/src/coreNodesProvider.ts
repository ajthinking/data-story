import { Application } from "./Application";
import { ComputerRegistry } from "./computerRegistry";
import { ServiceProvider } from "./types/ServiceProvider";

export const coreNodeProvider: ServiceProvider = {
  register: (app: Application) => {
    const all = ComputerRegistry.all()
    app.addComputers(all)
  },
  
  boot: (app: Application) => {}
}