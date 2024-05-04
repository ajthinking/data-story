import { Application } from './Application';
import { ServiceProvider } from './types/ServiceProvider';
import * as computerConfigs from './computers'
import { ComputerFactory } from './ComputerFactory';

export const coreNodeProvider: ServiceProvider = {
  register: (app: Application) => {
    const configs = Object.values(computerConfigs)
    app.addComputerConfigs(configs);
  },

  boot: (app: Application) => {}
}