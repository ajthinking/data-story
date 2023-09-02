import { Application } from "@data-story/core";
import { ServiceProvider } from "@data-story/core";
import * as computerConfigs from './computers'
import { ComputerFactory } from "@data-story/core";

export const NodeJsNodesProvider: ServiceProvider = {
  register: (app: Application) => {
    // Make all computers and put in a Map
    const computers = new Map(Object.values(computerConfigs).map(config => {
      const computer = new ComputerFactory().get(config);
      return [computer.name, computer];
    }));
    
    app.addComputers(computers);
  },
  
  boot: (app: Application) => {}
}