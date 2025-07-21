import { Application } from './Application';
import { ServiceProvider } from './types/ServiceProvider';
import * as computers from './computers'
import { Computer } from './types/Computer';

export const coreNodeProvider: ServiceProvider = {
  boot: async (app: Application) => {
    // ************************************************
    // Add normal computers
    // ************************************************
    app.addComputers(Object.values(computers));

    // ************************************************
    // Add configured aliases demo: Photos node
    // ************************************************
    app.addConfiguredComputerAlias('Request', (original) => {
      const clone = structuredClone(original)
      clone.label = 'Photos'
      const [ urlParam ] = clone.params
      urlParam.input.rawValue = 'https://jsonplaceholder.typicode.com/photos'
      return clone
    });
  },
}