import { Application } from '../Application';
import { ComputerFactory } from '../ComputerFactory';
import { ComputerConfig } from '../types/ComputerConfig';
import { ServiceProvider } from '../types/ServiceProvider';
import * as computerConfigs from './computers'

export const nodeJsNodesProvider: ServiceProvider = {
  register: (app: Application) => {
    // Make all computers and put in a Map
    const computers = new Map(Object.values(computerConfigs as {[key: string]: ComputerConfig}).map(config => {
      const computer = new ComputerFactory().get(config);
      return [computer.name, computer];
    }));
    
    app.addComputers(computers);
  },
  
  boot: (app: Application) => {}
}