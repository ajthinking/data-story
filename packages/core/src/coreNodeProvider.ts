import { Application } from './Application';
import { ServiceProvider } from './types/ServiceProvider';
import * as computers from './computers'

export const coreNodeProvider: ServiceProvider = {
  boot: (app: Application) => {
    app.addComputers(Object.values(computers));
  },
}