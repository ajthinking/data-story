import { Application } from './Application';
import { ServiceProvider } from './types/ServiceProvider';
import * as computers from './computers'
import { ComputerFactory } from './ComputerFactory';

export const coreNodeProvider: ServiceProvider = {
  register: (app: Application) => {
    app.addComputers(Object.values(computers));
  },

  boot: (app: Application) => {}
}