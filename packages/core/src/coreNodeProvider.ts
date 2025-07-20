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
    const photosComputer: Computer = {
      // Clonables
      ...structuredClone({
        ...computers.Request,
        run: undefined,
      }),
      // Non-clonables
      label: 'Photos',
      run: computers.Request.run,
    }

    const [ urlParam ] = photosComputer.params
    urlParam.input.rawValue = 'https://jsonplaceholder.typicode.com/photos'

    app.addConfiguredComputerAlias(photosComputer);
  },
}