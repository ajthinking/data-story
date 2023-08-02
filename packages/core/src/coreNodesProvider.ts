import { Application } from "./Application";
import { ComputerRegistry } from "./computerRegistry";
import { ServiceProvider } from "./types/ServiceProvider";

export const coreNodeProvider: ServiceProvider = {
  register: (app: Application) => {
    app.addComputers(
      ComputerRegistry.all()
    )
  },
  
  boot: (app: Application) => {}
}